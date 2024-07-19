import { Document, Types } from 'mongoose';
export declare class Contact extends Document {
    contacts: Types.ObjectId[];
}
export declare const ContactSchema: import("mongoose").Schema<Contact, import("mongoose").Model<Contact, any, any, any, Document<unknown, any, Contact> & Contact & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Contact, Document<unknown, {}, import("mongoose").FlatRecord<Contact>> & import("mongoose").FlatRecord<Contact> & Required<{
    _id: unknown;
}>>;
