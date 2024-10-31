import * as bcrypt from 'bcrypt';
import { createHash } from 'crypto';

export const hashData = (data: string) => {
    return bcrypt.hash(data, 10);
};

export const compareData = (data: string, hashedData: string): Promise<boolean> => {
    return bcrypt.compare(data, hashedData);
};

export const genarateChecksum = (buffer: Buffer) => {
    return createHash('md5').update(buffer).digest('hex');
};
