import { LocationRepositoryInterface } from '@infrastructure/database/mongodb/repositories/interfaces/location.repository.interface';
import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dtos/create-location.dto';
import { UpdateLocationDto } from './dtos/update-location.dto';

@Injectable()
export class LocationService {
    constructor(
        @Inject('LocationRepositoryInterface')
        private readonly locationRepository: LocationRepositoryInterface,
    ) {}

    async create(payload: CreateLocationDto) {
        const { latitude, longitude } = payload;
        const checkCoordinatesExist = await this.locationRepository.findOneByCondition({
            latitude,
            longitude,
        });
        if (checkCoordinatesExist) throw new ConflictException('Coordinates already exist.');
        return await this.locationRepository.create(payload);
    }

    async update(id: string, payload: UpdateLocationDto) {
        const { latitude, longitude } = payload;
        const checkCoordinatesExist = await this.locationRepository.findOneByCondition({
            latitude,
            longitude,
            _id: { $ne: id },
        });
        if (checkCoordinatesExist) throw new ConflictException('Coordinates already exist.');
        return await this.locationRepository.update(id, payload);
    }

    async search(keyword: string) {
        if (!keyword) throw new BadRequestException('Search keyword is required.');
        const locations = await this.locationRepository.findAll({
            $text: {
                $search: keyword,
            },
        });

        return locations.items;
    }
}
