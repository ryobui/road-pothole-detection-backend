import {
    CallHandler,
    ExecutionContext,
    HttpStatus,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ApiResponse } from '../interfaces';
import {
    API_RESPONSE_CODE,
    API_RESPONSE_MESSAGE,
} from '@common/decorators/metadata/api-response.metadata';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
    constructor(private reflector: Reflector) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
        const response = context.switchToHttp().getResponse();
        return next.handle().pipe(
            map((data) => {
                const status: number =
                    this.reflector.get(API_RESPONSE_CODE, context.getHandler()) ||
                    context.switchToHttp().getResponse().statusCode;
                status && response.status(status);

                return {
                    status: HttpStatus[status],
                    message:
                        this.reflector.get(API_RESPONSE_MESSAGE, context.getHandler()) || 'Success',
                    data: data,
                };
            }),
        );
    }
}
