import { Prop } from '@nestjs/mongoose';

export class BaseEntity {
    _id?: string;

    @Prop({ default: null })
    deletedAt: Date;
}
