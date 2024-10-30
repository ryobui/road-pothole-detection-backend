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
import { RESPONSE_MESSAGE_KEY } from '../decorators/metadata';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
    constructor(private reflector: Reflector) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
        return next.handle().pipe(
            map((data) => ({
                status: HttpStatus[context.switchToHttp().getResponse().statusCode],
                message:
                    this.reflector.get(RESPONSE_MESSAGE_KEY, context.getHandler()) || 'Success',
                data: data,
            })),
        );
    }
}
