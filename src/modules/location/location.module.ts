import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { LocationRepository } from '@infrastructure/database/mongodb/repositories/location.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Location,
    LocationSchema,
} from '@infrastructure/database/mongodb/entities/location.entity';

@Module({
    imports: [MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }])],
    controllers: [LocationController],
    providers: [
        LocationService,
        {
            provide: 'LocationRepositoryInterface',
            useClass: LocationRepository,
        },
    ],
})
export class LocationModule {}
