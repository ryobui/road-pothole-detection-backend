import * as dotenv from 'dotenv';
import { url } from 'inspector';
dotenv.config();

export const databaseConfig = () => ({
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    },
    mongodb: {
        uri: process.env.MONGODB_URI,
    },
});
