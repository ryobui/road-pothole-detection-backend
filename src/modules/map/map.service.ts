import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreatePotholeDto } from './dtos/create-pothole.dto';
import { PotholeRepositoryInterface } from '@infrastructure/database/mongodb/repositories/interfaces/pothole.repository.interface';
import { apiFetch } from '@common/utils/api';
import { BodyDirection } from './open-route-service/types/body-direction.type';
import { RouteProcessor } from './open-route-service/route-processor';
import { decode, encode } from '@googlemaps/polyline-codec';
import { BodyDirectionDto } from './dtos/direction.dto';
import { LocationRepositoryInterface } from '@infrastructure/database/mongodb/repositories/interfaces/location.repository.interface';

@Injectable()
export class MapService {
    constructor(
        @Inject('PotholeRepositoryInterface')
        private readonly potholeRepository: PotholeRepositoryInterface,
    ) {}

    async createPothole(createPotholeData: CreatePotholeDto) {
        const { longitude, latitude } = createPotholeData;
        const potholeExisting = await this.potholeRepository.findOneByCondition({
            latitude,
            longitude,
        });
        if (potholeExisting) throw new ConflictException('Pothole already exist');
        const newPothole = await this.potholeRepository.create({
            latitude,
            longitude,
        });
        return newPothole;
    }

    async getAllPothole() {
        return (await this.potholeRepository.findAll({})).items;
    }

    async directions(directionData: BodyDirectionDto) {
        const { startingPoint, endPoint } = directionData;
        try {
            const response = await apiFetch<BodyDirection, RoutesResponse>(
                'https://api.openrouteservice.org/v2/directions/driving-car/json',
                {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        Accept: 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
                        Authorization: '5b3ce3597851110001cf6248a39a5d4a4d1e4f438454ffdd4e7b2c5a',
                    },
                    body: {
                        coordinates: [
                            [startingPoint.longitude, startingPoint.latitude],
                            [endPoint.longitude, endPoint.latitude],
                        ],
                        preference: 'shortest',
                    },
                    method: 'POST',
                },
            );
            const processor = new RouteProcessor(response);
            const geometry = processor.getRouteGeometry();
            const summary = processor.getSummary();
            return {
                summary,
                geometry: decode(geometry),
            };
        } catch (error) {}
    }
}
