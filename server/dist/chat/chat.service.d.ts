import mongoose from 'mongoose';
import { Chat } from './chat.schema';
import { User } from 'src/users/user.schema';
export declare class ChatService {
    private userRepo;
    private readonly ChatRepo;
    constructor(userRepo: mongoose.Model<User>, ChatRepo: mongoose.Model<Chat>);
    get(stringId: string): Promise<(mongoose.Document<unknown, {}, Chat> & Chat & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    create(stringId: string, body: any): Promise<(mongoose.Document<unknown, {}, Chat> & Chat & {
        _id: mongoose.Types.ObjectId;
    }) | (mongoose.Document<unknown, {}, Chat> & Chat & {
        _id: mongoose.Types.ObjectId;
    })[]>;
}
