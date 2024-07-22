import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop({required: true})
    firstName: string;

    @Prop({required: true})
    lastName: string;

    @Prop({required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true})
    dob: Date;

    @Prop({required: true})
    address: string;

    @Prop({required: true})
    contactNo: string;

    @Prop({required: true, default:0})
    isActive: boolean;
}

export const userSchema = SchemaFactory.createForClass(User)