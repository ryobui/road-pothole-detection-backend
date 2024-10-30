import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { GmailService } from './services/email/gmail.service';
import { RedisModule } from './services/cache/redis.module';

@Global()
@Module({
    imports: [DatabaseModule, RedisModule],
    providers: [GmailService],
    exports: [GmailService],
})
export class InfrastructureModule {}
