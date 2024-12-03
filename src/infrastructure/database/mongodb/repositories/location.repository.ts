import { InjectModel } from '@nestjs/mongoose';
import { BaseRepositoryAbstract } from './base/base.repository.abstract';
import { Model } from 'mongoose';
import { LocationRepositoryInterface } from './interfaces/location.repository.interface';
import { Location } from '../entities/address.entity';

export class LocationRepository
    extends BaseRepositoryAbstract<Location>
    implements LocationRepositoryInterface
{
    constructor(@InjectModel(Location.name) private readonly locationRepository: Model<Location>) {
        super(locationRepository);
    }
}
