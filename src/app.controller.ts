import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get('images/:id')
    getImage() {}

    @Get('hello-world')
    helloWorld() {}
}
