import * as dotenv from 'dotenv';
dotenv.config();

export const jwtConfig = () => ({
    accessTokenJwt: {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '5m',
    },
    refreshTokenJwt: {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '7d',
    },
    globalJwt: {
        secret: process.env.GLOBAL_TOKEN_SECRET,
        expiresIn: '1m',
    },
});
