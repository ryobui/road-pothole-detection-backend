import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { GmailService } from './services/email/gmail.service';
import { RedisModule } from './services/cache/redis.module';
import { StorageService } from './services/storage/storage.service';

@Global()
@Module({
    imports: [DatabaseModule, RedisModule],
    providers: [GmailService, StorageService],
    exports: [GmailService, StorageService],
})
export class InfrastructureModule {}
