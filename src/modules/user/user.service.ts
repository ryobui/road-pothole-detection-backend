import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UserRepositoryInterface } from '@infrastructure/database/mongodb/repositories/interfaces/user.repository.interface';

@Injectable()
export class UserService {
    constructor(
        @Inject('UserRepositoryInterface') private readonly userRepository: UserRepositoryInterface,
    ) {}
    async updateProfile(userId: string, dataUpdate: UpdateProfileDto) {
        const { fullName, birthDay, address, gender } = dataUpdate;
        await this.userRepository.update(userId, {
            fullName,
            birthDay,
            address,
            gender,
        });
        return true;
    }

    async getProfile(userId: string) {
        const profile = await this.userRepository.getProfile(userId);
        if (!profile) {
            throw new NotFoundException('User not found');
        }
        return profile;
    }
}
