import { Expose } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';

export class DeviceHeaderDto {
    @IsString()
    @IsDefined()
    @Expose({ name: 'device-id' }) // required as headers are case insensitive
    deviceId: string;
}
