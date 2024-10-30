import { url } from 'inspector';

export const cacheConfig = () => ({
    redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379',
        ttl: parseInt(process.env.REDIS_TTL, 10) || 60,
    },
});
