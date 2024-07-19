import mongoose from 'mongoose';
import { User } from './user.schema';
export declare class UsersService {
    private UserRepo;
    constructor(UserRepo: mongoose.Model<User>);
    create(data: any): Promise<User>;
    findOne(email: string): Promise<User>;
    getAll(): Promise<User[]>;
    userOnline(id: string): Promise<void>;
    userOffline(id: string): Promise<void>;
}
