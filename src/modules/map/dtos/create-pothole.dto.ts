import { IsNotEmpty, IsString } from "class-validator"

export class CreatePotholeDto {
    @IsNotEmpty()
    @IsString()
    latitude: string

    @IsNotEmpty()
    @IsString()
    longitude: string
}