import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UserRepositoryInterface } from '@infrastructure/database/mongodb/repositories/interfaces/user.repository.interface';
import { StorageService } from '@infrastructure/services/storage/storage.service';
import { genarateChecksum } from '@common/utils/helpers';
import { User } from '@infrastructure/database/mongodb/entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject('UserRepositoryInterface') private readonly userRepository: UserRepositoryInterface,
        private readonly storageService: StorageService,
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
        return profile;
    }

    async updatePhoto(userId: string, file: Express.Multer.File) {
        const user = await this.userRepository.findOneById(userId);
        const checksum = genarateChecksum(file.buffer);
        if (checksum === user.checksumPhoto) {
            return {
                photo: 'localhost:3002/images/' + user.photo,
            };
        }
        const photo = await this.storageService.uploadFile(file);
        await this.userRepository.update(userId, { photo: photo.id, checksumPhoto: checksum });
        return {
            photo: 'localhost:3002/images/' + photo.id,
        };
    }

    async findById(userId: string): Promise<User | null> {
        const user = await this.userRepository.findOneById(userId);
        return user;
    }
}
