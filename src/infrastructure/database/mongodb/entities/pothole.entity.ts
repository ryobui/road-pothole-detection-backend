import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from './base.entity';
import { HydratedDocument, Types } from 'mongoose';

@Schema({
    collection: 'potholes',
    timestamps: true,
})
export class Pothole extends BaseEntity {
    @Prop({ required: true })
    latitude: number;

    @Prop({ required: true })
    longitude: number;

    @Prop({ type: String, default: null })
    severity: string;

    @Prop({ type: String, default: null })
    photo: string;
}

export type PotholeDocument = HydratedDocument<Pothole>;
export const PotholeSchema = SchemaFactory.createForClass(Pothole);
