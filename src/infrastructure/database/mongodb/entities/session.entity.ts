// src/schemas/session.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { BaseEntity } from './base.entity';

@Schema()
export class Session extends BaseEntity {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    deviceId: string;

    @Prop({ required: true })
    refreshToken: string;

    @Prop({ required: true })
    expiresAt: Date;
}

export type SessionDocument = HydratedDocument<Session>;
export const SessionSchema = SchemaFactory.createForClass(Session);
