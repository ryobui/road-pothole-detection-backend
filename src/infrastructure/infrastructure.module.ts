import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { GmailService } from './services/email/gmail.service';
import { RedisModule } from './services/cache/redis.module';
import { StorageService } from './services/storage/storage.service';
import { SlackNotificationModule } from './services/slack/slack-notification.module';

@Global()
@Module({
    imports: [DatabaseModule, RedisModule, SlackNotificationModule],
    providers: [GmailService, StorageService],
    exports: [GmailService, StorageService, SlackNotificationModule],
})
export class InfrastructureModule {}
