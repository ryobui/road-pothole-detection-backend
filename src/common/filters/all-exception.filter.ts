import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '../interfaces';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor() {}
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        console.log(exception);

        let errorResponse: ApiResponse<any> = {
            message:
                exception instanceof HttpException ? exception.message : 'Internal Server Error',
            status: HttpStatus[status],
            data: null,
        };

        if (exception instanceof HttpException && status === HttpStatus.BAD_REQUEST) {
            const validationErrors = exception.getResponse()['message'];
            if (Array.isArray(validationErrors) && validationErrors.length > 0) {
                errorResponse = {
                    ...errorResponse,
                    errors: validationErrors,
                };
            }
        }

        response.status(status).json(errorResponse);
    }
}
