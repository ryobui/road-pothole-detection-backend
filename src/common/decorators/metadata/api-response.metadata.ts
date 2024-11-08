import { SetMetadata } from '@nestjs/common';

export const API_RESPONSE_CODE = 'API_RESPONSE_CODE';
export const API_RESPONSE_MESSAGE = 'API_RESPONSE_MESSAGE';

export const ApiResponse = (statusCode: number, message: string) => {
    return (target: object, key: string | symbol, descriptor: PropertyDescriptor) => {
        SetMetadata(API_RESPONSE_CODE, statusCode)(target, key, descriptor);
        SetMetadata(API_RESPONSE_MESSAGE, message)(target, key, descriptor);
    };
};
