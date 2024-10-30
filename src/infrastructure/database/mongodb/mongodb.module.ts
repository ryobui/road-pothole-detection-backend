import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get('mongodb.uri'),
            }),
        }),
    ],
})
export class MongodbModule implements OnModuleInit {
    constructor(@InjectConnection() private connection: Connection) {}
    onModuleInit() {
        if (this.connection.readyState === 1) {
            console.log(`Connected to MongoDB database ${this.connection.db.databaseName}!`);
        }
    }
}
