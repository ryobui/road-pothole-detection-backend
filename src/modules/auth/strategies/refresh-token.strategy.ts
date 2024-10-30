import { PayloadToken } from '@common/interfaces';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('refreshTokenJwt.secret'),
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: PayloadToken) {
        const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
        if (!refreshToken) {
            throw new UnauthorizedException('Unauthorized');
        }

        if (
            !(await this.authService.validateRefreshToken(
                payload.sub,
                payload.deviceId,
                refreshToken,
            ))
        ) {
            throw new UnauthorizedException('Unauthorized');
        }
        return { ...payload, refreshToken };
    }
}
