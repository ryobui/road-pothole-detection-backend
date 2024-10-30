import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@infrastructure/database/mongodb/entities/user.entity';
import { UserRepository } from '@infrastructure/database/mongodb/repositories/user.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UserController],
    providers: [
        UserService,
        {
            provide: 'UserRepositoryInterface',
            useClass: UserRepository,
        },
    ],
    exports: [UserService],
})
export class UserModule {}
