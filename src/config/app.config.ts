import * as dotenv from 'dotenv';
dotenv.config();

export const appConfig = () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    nodeEnv: process.env.NODE_ENV || 'LOCAL',
    tokenORS: process.env.TOKEN_OPEN_ROUTE_SERVICE,
});
