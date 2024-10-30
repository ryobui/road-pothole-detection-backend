import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { BaseRepositoryAbstract } from './base/base.repository.abstract';
import { UserRepositoryInterface } from './interfaces/user.repository.interface';
import { Model } from 'mongoose';

export class UserRepository
    extends BaseRepositoryAbstract<User>
    implements UserRepositoryInterface
{
    constructor(@InjectModel(User.name) private readonly userRepository: Model<User>) {
        super(userRepository);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ email });
    }

    async getProfile(userId: string): Promise<User | null> {
        return this.userRepository
            .findById(userId)
            .select('-_id fullName email photo birthDay gender address')
            .lean();
    }
}
