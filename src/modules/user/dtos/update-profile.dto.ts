import { Gender } from '@infrastructure/database/mongodb/entities/user.entity';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
    @IsString()
    @IsOptional()
    fullName?: string;

    @IsDateString()
    @IsOptional()
    birthDay?: Date;

    @IsEnum(Gender)
    @IsOptional()
    gender?: Gender = Gender.Other;

    @IsString()
    @IsOptional()
    address?: string;
}
