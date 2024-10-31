import { Session } from '../../entities/session.entity';
import { BaseRepositoryInterface } from '../base/base.repository.interface';

export interface SessionRepositoryInterface extends BaseRepositoryInterface<Session> {
    findByUserIdAndDeviceId(userId: string, deviceId: string): Promise<Session>;
    deleteByUserIdAndDeviceId(userId: string, deviceId: string): Promise<void>;
    deleteAllSessionOfUser(userId: string): Promise<void>;
    createOrUpdate(userId: string, deviceId: string, sessionData: Partial<Session>): Promise<void>;
}
