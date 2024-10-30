import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from './base.entity';
import { HydratedDocument, Types } from 'mongoose';
import { ObjectId } from 'typeorm';

@Schema({
    collection: 'users',
    timestamps: true,
})
export class User extends BaseEntity {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ default: null })
    password: string;

    @Prop({ default: null })
    photo: string;

    @Prop({ default: null })
    dateOfBirth: Date;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
