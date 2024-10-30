import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from './base.entity';
import { HydratedDocument, Types } from 'mongoose';

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

@Schema({
    collection: 'users',
    timestamps: true,
})
export class User extends BaseEntity {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ default: null })
    password: string;

    @Prop({ required: true })
    fullName: string;

    @Prop({ default: null })
    photo: string;

    @Prop({ default: null })
    birthDay: Date;

    @Prop({ type: String, enum: Gender, default: Gender.Other })
    gender: Gender;

    @Prop({ default: null })
    address: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
