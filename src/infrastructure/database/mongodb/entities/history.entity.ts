import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from './base.entity';
import { HydratedDocument } from 'mongoose';

export type HistoryDocument = HydratedDocument<History>;

@Schema({
    collection: 'histories',
    timestamps: true,
    versionKey: false,
})
export class History extends BaseEntity {
    @Prop({ required: true, unique: true })
    ip: string;

    @Prop({ required: false })
    action: string;

    @Prop({ required: false })
    type: string;

    @Prop({})
    payload: string;
}

export const HistorySchema = SchemaFactory.createForClass(History);
