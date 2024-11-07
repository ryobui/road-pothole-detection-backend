import {
    ConflictException,
    ForbiddenException,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { UserRepositoryInterface } from '@infrastructure/database/mongodb/repositories/interfaces/user.repository.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GmailService } from '@infrastructure/services/email/gmail.service';
import { RedisService } from '@infrastructure/services/cache/redis.service';
import { SignupDto } from './dtos/signup.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { VerifyPinDto } from './dtos/verify-pin.dto';
import forgotPaswordOtpTemplate from '@infrastructure/services/email/templates/forgot-pasword-otp.template';
import { hashData } from '@common/utils/helpers';
import { User } from '@infrastructure/database/mongodb/entities/user.entity';
import { PayloadToken } from '@common/interfaces';
import { SessionRepositoryInterface } from '@infrastructure/database/mongodb/repositories/interfaces/session.repository.interface';
import { Session } from '@infrastructure/database/mongodb/entities/session.entity';

@Injectable()
export class AuthService {
    private readonly TEMP_TOKEN_EXPIRY = '10m';
    private readonly RESET_PASSWORD_TOKEN_TYPE = 'reset-password';
    private readonly TIME_TO_LIVE = 600;

    constructor(
        @Inject('UserRepositoryInterface') private readonly userRepository: UserRepositoryInterface,
        @Inject('SessionRepositoryInterface')
        private readonly sessionRepository: SessionRepositoryInterface,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly gmailService: GmailService,
        private readonly redisService: RedisService,
    ) {}

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    async login(user: User, deviceId: string, userAgent: string) {
        const payload: PayloadToken = { sub: user._id, email: user.email, deviceId };

        const { accessToken, refreshToken } = await this.generateTokens(payload);
        await this.createSession(user._id, deviceId, {
            userId: user._id,
            refreshToken,
            userAgent,
            deviceId,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        return { accessToken, refreshToken };
    }

    async signup(signupData: SignupDto, deviceId: string, userAgent: string) {
        const { email, password, fullName } = signupData;

        if (await this.userRepository.findByEmail(email)) {
            throw new ConflictException('Email is already registered');
        }

        const hashedPassword = await hashData(password);
        const user = await this.userRepository.create({
            email,
            password: hashedPassword,
            fullName,
        });

        const payload: PayloadToken = { sub: user._id, email: user.email, deviceId };
        const { accessToken, refreshToken } = await this.generateTokens(payload);
        await this.createSession(user._id, deviceId, {
            userId: user._id,
            refreshToken,
            userAgent,
            deviceId,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        return { accessToken, refreshToken };
    }

    async logout(userId: string, deviceId: string) {
        await this.sessionRepository.deleteByUserIdAndDeviceId(userId, deviceId);
    }

    async refresh(payload: PayloadToken) {
        const accessToken = await this.generateAccessToken(payload);
        return { accessToken };
    }

    async validateRefreshToken(userId: string, deviceId: string, refreshToken: string) {
        const session = await this.sessionRepository.findByUserIdAndDeviceId(userId, deviceId);
        if (!session || session.refreshToken !== refreshToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }
        return true;
    }

    async requestPasswordReset(email: string): Promise<void> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new NotFoundException('Email not registered');

        throw new InternalServerErrorException('Fail');
        const pin = this.generatePin();
        await Promise.all([
            this.redisService.set(email, pin, this.TIME_TO_LIVE),
            this.gmailService.sendMail(
                user.email,
                'Forgot Password',
                forgotPaswordOtpTemplate(pin),
            ),
        ]);
        return null;
    }

    async verifyPin({ email, pin }: VerifyPinDto) {
        const storedPin = await this.redisService.get(email);
        if (pin !== storedPin) throw new ForbiddenException('Pin is invalid');

        await this.redisService.del(email);
        const resetPasswordToken = await this.generateTemporaryToken(
            email,
            this.RESET_PASSWORD_TOKEN_TYPE,
        );
        await this.redisService.set(resetPasswordToken, email, this.TIME_TO_LIVE);
        return { resetPasswordToken };
    }

    async resetPassword({ newPassword }: ResetPasswordDto, token: string) {
        if (!(await this.redisService.get(token))) throw new ForbiddenException('Token is invalid');

        const payload = await this.verifyToken(token, this.RESET_PASSWORD_TOKEN_TYPE);
        const user = await this.userRepository.findByEmail(payload.sub);
        if (!user) throw new NotFoundException('User not found');
        const hashedPassword = await hashData(newPassword);

        /**
         * step 1: update user password
         * step 2: delete token from redis
         * step 3: delete all sessions of the user
         */
        await Promise.all([
            await this.userRepository.update(user._id, { password: hashedPassword }),
            await this.redisService.del(token),
            await this.sessionRepository.deleteAllSessionOfUser(user._id),
        ]);
        return true;
    }

    changePassword = async (userId: string, currentPassword: string, newPassword: string) => {
        const user = await this.userRepository.findOneById(userId);
        if (!user) throw new NotFoundException('User not found');

        if (!(await bcrypt.compare(currentPassword, user.password))) {
            throw new ForbiddenException('Old password is incorrect');
        }

        const hashedPassword = await hashData(newPassword);

        /**
         * step 1: update user password
         * step 2: delete all sessions of the user
         **/
        await Promise.all([
            await this.userRepository.update(user._id, { password: hashedPassword }),
            await this.sessionRepository.deleteAllSessionOfUser(user._id),
        ]);
        return true;
    };

    private async createSession(userId: string, deviceId: string, data: Partial<Session>) {
        await this.sessionRepository.createOrUpdate(userId, deviceId, data);
    }

    private async generateTokens(payload: PayloadToken) {
        const [accessToken, refreshToken] = await Promise.all([
            this.generateAccessToken(payload),
            this.generateRefreshToken(payload),
        ]);
        return { accessToken, refreshToken };
    }

    private generateAccessToken(payload: PayloadToken) {
        const secret = this.configService.get('accessTokenJwt.secret');
        const expiresIn = this.configService.get('accessTokenJwt.expiresIn');
        return this.jwtService.signAsync(payload, { secret, expiresIn });
    }

    private generateRefreshToken(payload: PayloadToken) {
        const secret = this.configService.get('refreshTokenJwt.secret');
        const expiresIn = this.configService.get('refreshTokenJwt.expiresIn');
        return this.jwtService.signAsync(payload, { secret, expiresIn });
    }

    private generateTemporaryToken(email: string, type: string) {
        return this.jwtService.signAsync(
            { sub: email, type },
            { expiresIn: this.TEMP_TOKEN_EXPIRY },
        );
    }

    private async verifyToken(token: string, expectedType: string) {
        try {
            const payload = this.jwtService.verify(token);
            if (payload.type !== expectedType) throw new ForbiddenException('Invalid token type');
            return payload;
        } catch {
            throw new ForbiddenException('Token is invalid');
        }
    }

    private generatePin() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
}
