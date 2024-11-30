import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from './base.entity';
import { HydratedDocument, Types } from 'mongoose';

@Schema({
    collection: 'potholes',
    timestamps: true,
})
export class Pothole extends BaseEntity {
    @Prop({ required: true })
    latitude: string;

    @Prop({ required: true })
    longitude: string;

    @Prop({type: String, default: null})
    photo: string;
}

export type PotholeDocument = HydratedDocument<Pothole>;
export const PotholeSchema = SchemaFactory.createForClass(Pothole);
