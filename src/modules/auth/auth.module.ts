import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@infrastructure/database/mongodb/entities/user.entity';
import { UserRepository } from '@infrastructure/database/mongodb/repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { GmailService } from '@infrastructure/services/email/gmail.service';
import { RedisService } from '@infrastructure/services/cache/redis.service';
import { SessionRepository } from '@infrastructure/database/mongodb/repositories/session.repository';
import { Session, SessionSchema } from '@infrastructure/database/mongodb/entities/session.entity';
import { UserService } from '@modules/user/user.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Session.name, schema: SessionSchema },
        ]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('globalJwt.secret'),
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        UserService,
        GoogleStrategy,
        {
            provide: 'UserRepositoryInterface',
            useClass: UserRepository,
        },
        {
            provide: 'SessionRepositoryInterface',
            useClass: SessionRepository,
        },
        GmailService,
        RedisService,
        AccessTokenStrategy,
        RefreshTokenStrategy,
    ],
    exports: [],
})
export class AuthModule {}
