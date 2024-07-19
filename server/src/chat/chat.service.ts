import { BadRequestException, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { Chat } from './chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/user.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(User.name) private userRepo: mongoose.Model<User>,
    @InjectModel(Chat.name) private readonly ChatRepo: mongoose.Model<Chat>,
  ) {}
  async get(stringId: string) {
    const id = new mongoose.Types.ObjectId(stringId);
    let res = await this.ChatRepo.find({ users: { $in: [stringId] } }).populate(
      {
        path: 'users',
        select: 'name email pic isActive',
        model: 'User',
      },
    );

    return res;
  }

  async create(stringId: string, body: any) {
    let ischat = await this.ChatRepo.find({
      isGroupChat: false,
      $and: [{ users: { $all: [stringId, body.contactId] } }],
    }).populate({
      path: 'users',
      select: '-password -isAdmin ',
      model: 'User',
    });

    if (ischat.length > 0) {
      return ischat;
    } else {
      let chatData = {
        chatName: 'direct',
        isGroupChat: false,
        users: [stringId, body.contactId],
      };

      try {
        const createdChat = await this.ChatRepo.create(chatData);
        const FullChat = await this.ChatRepo.findOne({
          _id: createdChat._id,
        }).populate({
          path: 'users',
          select: '-password -isAdmin isActive',
          model: 'User',
        });
        return FullChat;
      } catch (error) {
        new BadRequestException('error while creating chat');
      }
    }
  }
}
