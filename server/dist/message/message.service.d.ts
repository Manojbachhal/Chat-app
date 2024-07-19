import { Message } from './message.schema';
import mongoose from 'mongoose';
export declare class MessageService {
    private readonly MessageRepo;
    constructor(MessageRepo: mongoose.Model<Message>);
    create(stringId: string, chatId: string, content: string): Promise<Omit<mongoose.Document<unknown, {}, Message> & Message & {
        _id: Types.ObjectId;
    }, never>>;
    get(chatId: string): Promise<(mongoose.Document<unknown, {}, Message> & Message & {
        _id: Types.ObjectId;
    })[]>;
}
