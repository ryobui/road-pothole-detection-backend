import * as bcrypt from 'bcrypt';

const hashData = (data: string) => {
    return bcrypt.hash(data, 10);
};

const compareData = (data: string, hashedData: string): Promise<boolean> => {
    return bcrypt.compare(data, hashedData);
};

export { hashData, compareData };
