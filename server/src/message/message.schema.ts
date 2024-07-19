import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  sender: Types.ObjectId;

  @Prop({ trim: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'Chat' })
  chat: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  readyBy: Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
