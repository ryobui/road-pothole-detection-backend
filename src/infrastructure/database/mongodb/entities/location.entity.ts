import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from './base.entity';
import { HydratedDocument, Types } from 'mongoose';

@Schema({
    collection: 'locations',
})
export class Location extends BaseEntity {
    @Prop({ type: String, default: null })
    name: string;

    @Prop({ required: true, type: String })
    address: string;

    @Prop({ required: true, type: Number })
    latitude: number;

    @Prop({ required: true, type: Number })
    longitude: number;
}

export type LocationDocument = HydratedDocument<Location>;
export const LocationSchema = SchemaFactory.createForClass(Location);

LocationSchema.index({
    name: 'text',
    address: 'text',
});
