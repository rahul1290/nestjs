import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

export type CategoryDocument = Category & Document

@Schema()
export class Category {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    description: string;

    @Prop()
    image:string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    createdBy: Types.ObjectId;

    @Prop({required: true})
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop({default:1})
    isActive: boolean;
}

export const categorySchema = SchemaFactory.createForClass(Category)


categorySchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

categorySchema.pre('updateOne', function (next) {
    this.set({ updatedAt: new Date() });
    next();
  });
  
categorySchema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: new Date() });
    next();
  });