import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { GoogleGuard } from '../../common/guards/google.guard';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from '@common/guards/access-token.guard';
import { RefreshTokenGuard } from '@common/guards/refresh-token.guard';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { VerifyPinDto } from './dtos/verify-pin.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { RequestHeader } from '@common/decorators/request-header.decorator';
import { DeviceHeaderDto } from './dtos/device-header.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { ApiResponse } from '@common/decorators/metadata/api-response.metadata';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('google')
    @UseGuards(GoogleGuard)
    googleLogin() {}

    @Get('google/redirect')
    @UseGuards(GoogleGuard)
    googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
        return res.redirect(`https://facebook.com`);
    }

    @Post('signup')
    @ApiResponse(HttpStatus.OK, 'Signup success. Please redirect to login')
    @HttpCode(HttpStatus.OK)
    signin(
        @Req() req: Request,
        @RequestHeader(DeviceHeaderDto) headers: DeviceHeaderDto,
        @Body() signupData: SignupDto,
    ) {
        const deviceId = headers.deviceId;
        const userAgent = req.headers['user-agent'];
        return this.authService.signup(signupData, deviceId, userAgent);
    }

    @Post('login')
    @ApiResponse(HttpStatus.OK, 'Login succeeded')
    async login(
        @Req() req: Request,
        @RequestHeader(DeviceHeaderDto) headers: DeviceHeaderDto,
        @Body() loginData: LoginDto,
    ) {
        const deviceId = headers.deviceId;
        const userAgent = req.headers['user-agent'];
        const { email, password } = loginData;
        const user = await this.authService.validateUser(email, password);
        const tokens = await this.authService.login(user, deviceId, userAgent);
        return tokens;
    }

    @Get('logout')
    @ApiResponse(HttpStatus.OK, 'Logout succeeded')
    @UseGuards(AccessTokenGuard)
    async logout(@Req() req: Request) {
        const userId = req.user['sub'];
        const deviceId = req.user['deviceId'];
        await this.authService.logout(userId, deviceId);
    }

    @Get('refresh')
    @UseGuards(RefreshTokenGuard)
    @ApiResponse(HttpStatus.OK, 'Refresh token succeeded.')
    refreshToken(@Req() req: Request) {
        return this.authService.refresh({
            sub: req.user['sub'],
            email: req.user['email'],
            deviceId: req.user['deviceId'],
        });
    }

    @Post('request-password-reset')
    @ApiResponse(HttpStatus.OK, 'Please, Check your email!')
    requestPasswordReset(@Body() { email }: ForgotPasswordDto) {
        return this.authService.requestPasswordReset(email);
    }

    @Post('verify-pin')
    @ApiResponse(HttpStatus.OK, 'Verify PIN success.')
    @HttpCode(HttpStatus.OK)
    verifyPin(@Body() verifyPinData: VerifyPinDto) {
        return this.authService.verifyPin(verifyPinData);
    }

    @Put('reset-password')
    @ApiResponse(HttpStatus.OK, 'Reset password success.')
    resetPassword(@Body() resetPasswordData: ResetPasswordDto, @Query('token') token: string) {
        return this.authService.resetPassword(resetPasswordData, token);
    }

    @Put('change-password')
    @ApiResponse(HttpStatus.OK, 'Please, Re-login account.')
    @UseGuards(AccessTokenGuard)
    changePassword(
        @Req() req: Request,
        @Body() { currentPassword, newPassword }: ChangePasswordDto,
    ) {
        return this.authService.changePassword(req.user['sub'], currentPassword, newPassword);
    }
}
