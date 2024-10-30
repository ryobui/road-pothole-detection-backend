import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { ConfigService } from '@nestjs/config';
import { secondToMilliseconds } from '@common/utils/time';

@Module({
    imports: [
        CacheModule.registerAsync({
            inject: [ConfigService],
            isGlobal: true,
            useFactory: async (configService: ConfigService) => {
                return {
                    store: await redisStore({
                        url: configService.get('redis.url'),
                        ttl: secondToMilliseconds(configService.get('redis.ttl')),
                    }),
                };
            },
        }),
    ],
    providers: [RedisService],
    exports: [RedisService],
})
export class RedisModule {}
