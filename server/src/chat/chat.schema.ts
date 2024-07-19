import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Chat {
  @Prop()
  chatName: string;

  @Prop({ default: false })
  isGroupChat: boolean;

  @Prop({
    required: true,
    default:
      'https://getwallpapers.com/wallpaper/full/4/b/0/1089756-one-piece-crew-wallpaper-2666x1444-for-1080p.jpg',
  })
  groupPic: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  users: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Message' })
  latestMessage: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  groupAdmin: boolean;
}

export const chatSchema = SchemaFactory.createForClass(Chat);
