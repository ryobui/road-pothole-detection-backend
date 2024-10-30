import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject() configService: ConfigService) {
        super({
            clientID: configService.get('googleAuth.clientId'),
            clientSecret: configService.get('googleAuth.clientSecret'),
            callbackURL: configService.get('googleAuth.redirectUrl'),
            scope: ['email', 'profile'],
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(
        _accessToken: string,
        _refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ) {
        done(null, profile);
    }
}
