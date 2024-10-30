import { IsNotEmpty, IsString } from 'class-validator';

export class LogoutDto {
    @IsString()
    @IsNotEmpty()
    deviceId: string;

    @IsString()
    @IsNotEmpty()
    userId: string;
}
