import * as dotenv from 'dotenv';
dotenv.config();

export const cacheConfig = () => ({
    redis: {
        url: process.env.REDIS_URL,
        ttl: parseInt(process.env.REDIS_TTL, 10) || 60,
        password: 'your_secure_password',
    },
});
