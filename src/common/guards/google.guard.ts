import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleGuard extends AuthGuard('google') {
    async validate(context: ExecutionContext) {
        const active = await super.canActivate(context);
        const request = context.switchToHttp().getRequest();

        await super.logIn(request);
        return active;
    }
}
