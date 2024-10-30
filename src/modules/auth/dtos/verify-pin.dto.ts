import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyPinDto {
    @IsString()
    @IsNotEmpty()
    pin: string;

    @IsNotEmpty()
    @IsString()
    email: string;
}
