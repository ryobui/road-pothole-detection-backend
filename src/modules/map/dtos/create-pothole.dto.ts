import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreatePotholeDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(-90)
    @Max(90)
    latitude: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(-180)
    @Max(180)
    longitude: number;

    @IsString()
    severity: string;
}
