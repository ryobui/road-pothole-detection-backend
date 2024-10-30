import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { BaseRepositoryAbstract } from './base/base.repository.abstract';
import { Model } from 'mongoose';
import { SessionRepositoryInterface } from './interfaces/session.repository.interface';
import { Session } from '../entities/session.entity';

export class SessionRepository
    extends BaseRepositoryAbstract<Session>
    implements SessionRepositoryInterface
{
    constructor(@InjectModel(Session.name) private readonly sessionRepository: Model<Session>) {
        super(sessionRepository);
    }

    async findByUserIdAndDeviceId(userId: string, deviceId: string): Promise<Session> {
        return this.sessionRepository.findOne({ userId, deviceId });
    }

    async deleteByUserIdAndDeviceId(userId: string, deviceId: string): Promise<void> {
        await this.sessionRepository.deleteOne({ userId, deviceId });
    }

    async deleteAllSessionOfUser(userId: string): Promise<void> {
        await this.sessionRepository.deleteMany({ userId });
    }
}
