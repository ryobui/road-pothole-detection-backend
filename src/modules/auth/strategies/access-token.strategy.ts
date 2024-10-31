import { PayloadToken } from '@common/interfaces';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { UserService } from '@modules/user/user.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('accessTokenJwt.secret'),
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: PayloadToken) {
        const user = await this.userService.findById(payload.sub);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return payload;
    }
}
