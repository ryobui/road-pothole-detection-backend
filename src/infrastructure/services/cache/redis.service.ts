import { secondToMilliseconds } from '@common/utils/time';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

    async get(key: string) {
        return await this.cache.get(key);
    }

    async set(key: string, value: unknown, ttl = 0) {
        if (ttl > 0) {
            ttl = secondToMilliseconds(ttl);
        }
        await this.cache.set(key, value, ttl);
    }

    async del(key: string) {
        await this.cache.del(key);
    }

    async reset() {
        await this.cache.reset();
    }
}
