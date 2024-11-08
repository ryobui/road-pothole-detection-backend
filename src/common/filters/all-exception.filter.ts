import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Inject,
} from '@nestjs/common';
import { ApiResponse } from '../interfaces';
import { Response } from 'express';
import { SlackNotificationService } from '@infrastructure/services/slack/slack-notification.service';
import { ConfigService } from '@nestjs/config';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly NODE_ENV;
    constructor(
        private readonly slackNotificationService: SlackNotificationService,
        private readonly configService: ConfigService,
    ) {
        this.NODE_ENV = this.configService.get('nodeEnv');
    }
    async catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        if (
            (this.NODE_ENV === 'PRODUCTION' || this.NODE_ENV === 'DEVELOPMENT') &&
            status === HttpStatus.INTERNAL_SERVER_ERROR
        ) {
            const errorMessage = `
                :beetle: *Exception occurred* :beetle: **
                - *Method:* \`${request.url}\`
                - *Error Message:* ${exception.message}
                - *Stack Trace:* \`\`\`${exception.stack}\`\`\`
            `;
            await this.slackNotificationService.sendErrorNotification(errorMessage);
        }

        let errorResponse: ApiResponse<any> = {
            message:
                status === HttpStatus.INTERNAL_SERVER_ERROR
                    ? 'Internal Server Error'
                    : exception.message,
            status: HttpStatus[status],
            stack: this.NODE_ENV === 'LOCAL' ? exception.stack : undefined,
            data: null,
        };

        if (status === HttpStatus.BAD_REQUEST) {
            const validationErrors = exception.getResponse();
            if (validationErrors) {
                errorResponse = {
                    ...errorResponse,
                    message: 'Validation failed',
                    errors: validationErrors,
                };
            }
        }

        response.status(status).json(errorResponse);
    }
}
