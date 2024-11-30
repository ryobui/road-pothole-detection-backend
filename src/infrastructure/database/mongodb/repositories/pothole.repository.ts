import { InjectModel } from '@nestjs/mongoose';
import { BaseRepositoryAbstract } from './base/base.repository.abstract';
import { Model } from 'mongoose';
import { Pothole } from '../entities/pothole.entity';
import { PotholeRepositoryInterface } from './interfaces/pothole.repository.interface';

export class PotholeRepository
    extends BaseRepositoryAbstract<Pothole>
    implements PotholeRepositoryInterface
{
    constructor(@InjectModel(Pothole.name) private readonly potholeRepository: Model<Pothole>) {
        super(potholeRepository);
    }
}
