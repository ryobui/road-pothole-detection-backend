import {
    Body,
    Controller,
    Get,
    Patch,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { AccessTokenGuard } from '@common/guards/access-token.guard';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('profile')
    @UseGuards(AccessTokenGuard)
    async getProfile(@Req() req: Request) {
        const userId = req.user['sub'] as string;
        return this.userService.getProfile(userId);
    }

    @Patch('profile')
    @UseGuards(AccessTokenGuard)
    async updateProfile(@Req() req: Request, @Body() dataUpdate: UpdateProfileDto) {
        const userId = req.user['sub'] as string;
        return this.userService.updateProfile(userId, dataUpdate);
    }

    @Patch('update-photo')
    @UseGuards(AccessTokenGuard)
    @UseInterceptors(FileInterceptor('image'))
    async updatePhoto(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
        /**
         * Implement update photo logic here
         * - Upload photo to cloud storage
         * - Update user photo in database
         * - Return updated user profile
         */
        const userId = req.user['sub'] as string;
        return await this.userService.updatePhoto(userId, file);
    }
}
