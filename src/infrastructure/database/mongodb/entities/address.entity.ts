import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from './base.entity';
import { HydratedDocument, Types } from 'mongoose';

@Schema({
    collection: 'locations',
    timestamps: true,
})
export class Location extends BaseEntity {
    @Prop({required: true, type: String})
    address: string;

    @Prop({ required: true })
    latitude: number;

    @Prop({ required: true })
    longitude: number;
}

export type LocationDocument = HydratedDocument<Location>;
export const LocationSchema = SchemaFactory.createForClass(Location);
