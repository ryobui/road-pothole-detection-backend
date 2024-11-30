import { Inject, Injectable } from '@nestjs/common';
import { CreatePotholeDto } from './dtos/create-pothole.dto';
import { PotholeRepositoryInterface } from '@infrastructure/database/mongodb/repositories/interfaces/pothole.repository.interface';

@Injectable()
export class MapService {
    constructor(
        @Inject('PotholeRepositoryInterface')
        private readonly potholeRepository: PotholeRepositoryInterface,
    ) {}

    async createPothole(createPotholeData: CreatePotholeDto) {
        const { longitude, latitude } = createPotholeData;
        const newPothole = await this.potholeRepository.create({
            latitude, longitude
        })

        return newPothole
    }

    async getAllPothole() {
        return (await this.potholeRepository.findAll({})).items
    }
}
