import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '../interfaces';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor() {}
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        let errorResponse: ApiResponse<any> = {
            message:
                status === HttpStatus.INTERNAL_SERVER_ERROR
                    ? 'Internal Server Error'
                    : exception.message,
            status: HttpStatus[status],
            stack: exception.stack,
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
