import mongoose, { Types } from 'mongoose';
export declare class Chat {
    chatName: string;
    isGroupChat: boolean;
    groupPic: string;
    users: Types.ObjectId[];
    latestMessage: string;
    groupAdmin: boolean;
}
export declare const chatSchema: mongoose.Schema<Chat, mongoose.Model<Chat, any, any, any, mongoose.Document<unknown, any, Chat> & Chat & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Chat, mongoose.Document<unknown, {}, mongoose.FlatRecord<Chat>> & mongoose.FlatRecord<Chat> & {
    _id: Types.ObjectId;
}>;
