import { User } from '../../entities/user.entity';
import { BaseRepositoryInterface } from '../base/base.repository.interface';

export interface UserRepositoryInterface extends BaseRepositoryInterface<User> {
    findByEmail(email: string): Promise<User | null>;
}
