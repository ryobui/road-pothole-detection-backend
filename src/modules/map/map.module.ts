import { Module } from '@nestjs/common';
import { MapService } from './map.service';
import { MapController } from './map.controller';
import { PotholeRepository } from '@infrastructure/database/mongodb/repositories/pothole.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Pothole, PotholeSchema } from '@infrastructure/database/mongodb/entities/pothole.entity';

@Module({
    imports: [MongooseModule.forFeature([{ name: Pothole.name, schema: PotholeSchema }])],
    controllers: [MapController],
    providers: [
        MapService,
        {
            provide: 'PotholeRepositoryInterface',
            useClass: PotholeRepository,
        }
    ],
})
export class MapModule {}
