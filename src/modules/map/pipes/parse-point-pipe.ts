import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParsePointPipe implements PipeTransform {
  transform(value: string) {
    const [latitude,longitude] = value.split(',').map((coord) => parseFloat(coord));
    if (isNaN(longitude) || isNaN(latitude)) {
      throw new BadRequestException('Invalid coordinate format. Expected: longitude,latitude');
    }
    return { longitude, latitude };
  }
}
