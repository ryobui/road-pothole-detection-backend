import { IsNumber, IsObject } from 'class-validator';

export class PointDto {
    longitude: number;
    latitude: number;
}

export class BodyDirectionDto {
    @IsObject()
    startingPoint: PointDto;

    @IsObject()
    endPoint: PointDto;
}
