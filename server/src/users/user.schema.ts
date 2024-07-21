import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  toObject() {
    throw new Error('Method not implemented.');
  }
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({
    default:
      'https://wallpapers-clan.com/wp-content/uploads/2022/08/zoro-pfp-1.jpg',
  })
  pic: string;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ default: false })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
