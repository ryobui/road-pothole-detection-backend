import {
    Body,
    Controller,
    Get,
    Patch,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { AccessTokenGuard } from '@common/guards/access-token.guard';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '@common/pipes/file.validation.pipe';

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
    @UseInterceptors(FileInterceptor('file'))
    async updatePhoto(
        @Req() req: Request,
        @UploadedFile(new FileValidationPipe(2 * 1024 * 1024, ['jpg', 'jpeg', 'png', 'webp']))
        file: Express.Multer.File,
    ) {
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
