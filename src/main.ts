import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { BadRequestException, RequestMethod, ValidationPipe } from '@nestjs/common';
import { appConfig } from './config';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const PORT = appConfig().port;

    app.use(compression());
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
            enableDebugMessages: true,
            exceptionFactory: (validationErorrs) => {
                const errors = {};

                validationErorrs.forEach((error) => {
                    errors[error.property] = Object.values(error.constraints);
                });
                return new BadRequestException(errors);
            },
        }),
    );
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.setGlobalPrefix('api', {
        // exclude: [{ path: 'example', method: RequestMethod.GET }], example of excluding a route
    });
    await app
        .listen(PORT, '0.0.0.0')
        .then(() => {
            console.log('Server is running on port ' + PORT);
        })
        .catch((error) => {
            console.log(error);
        });
}
bootstrap();
