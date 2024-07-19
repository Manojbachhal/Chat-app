import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from './contacts.schema';
import * as mongoose from 'mongoose';
import { User } from 'src/users/user.schema';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private ContactRepo: mongoose.Model<Contact>,
    @InjectModel(User.name) private userRepo: mongoose.Model<User>,
  ) {}

  async createContact(userId: string, contactId: string) {
    const user = await this.userRepo.findById(userId).select('name email pic');
    const contact = await this.userRepo
      .findById(contactId)
      .select('name email pic');

    try {
      const existingContact = await this.ContactRepo.findOne({
        contacts: { $all: [userId, contactId] },
      });

      if (existingContact == null) {
        let newContact = await this.ContactRepo.create({
          contacts: [userId, contactId],
        });
        // await newContact.populate({
        //   path: 'contact',
        //   select: 'name pic email',
        //   model: 'User',
        // });
        // console.log(newContact);
        return newContact;
      } else {
        return existingContact;
      }
    } catch (error) {
      return new BadRequestException(
        ' Internal server error while adding contact',
      );
    }
  }

  //
  async get(stringId: string) {
    let res = await this.ContactRepo.find({
      contacts: { $in: [stringId] },
    }).populate({
      path: 'contacts',
      select: 'name email pic isActive',
      model: 'User',
    });
    return res;
  }
}
