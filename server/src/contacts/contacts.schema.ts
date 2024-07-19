import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Contact extends Document {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  contacts: Types.ObjectId[];
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
