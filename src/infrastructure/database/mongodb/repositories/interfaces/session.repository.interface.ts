import { Session } from '../../entities/session.entity';
import { BaseRepositoryInterface } from '../base/base.repository.interface';

export interface SessionRepositoryInterface extends BaseRepositoryInterface<Session> {
    findByUserIdAndDeviceId(userId: string, deviceId: string): Promise<Session>;
    deleteByUserIdAndDeviceId(userId: string, deviceId: string): Promise<void>;
    deleteByUserId(userId: string): Promise<void>;
}
