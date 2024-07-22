import { BadRequestException } from '@nestjs/common';
import { Contact } from './contacts.schema';
import * as mongoose from 'mongoose';
import { User } from 'src/users/user.schema';
export declare class ContactsService {
    private ContactRepo;
    private userRepo;
    constructor(ContactRepo: mongoose.Model<Contact>, userRepo: mongoose.Model<User>);
    createContact(userId: string, contactId: string): Promise<BadRequestException | (mongoose.Document<unknown, {}, Contact> & Contact & Required<{
        _id: unknown;
    }>)>;
    get(stringId: string): Promise<(mongoose.Document<unknown, {}, Contact> & Contact & Required<{
        _id: unknown;
    }>)[]>;
}
