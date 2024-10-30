import { Model } from 'mongoose';
import { History } from '../entities/history.entity';
import { BaseRepositoryAbstract } from './base/base.repository.abstract';
import { HistoryRepositoryInterface } from './interfaces/history.repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HistoryRepository
    extends BaseRepositoryAbstract<History>
    implements HistoryRepositoryInterface
{
    constructor(
        @InjectModel(History.name)
        private readonly historyRepository: Model<History>,
    ) {
        super(historyRepository);
    }
}
