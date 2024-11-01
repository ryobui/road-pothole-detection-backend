import * as dotenv from 'dotenv';
dotenv.config();

export const databaseConfig = () => ({
    mongodb: {
        uri: process.env.MONGODB_URI,
    },
});
