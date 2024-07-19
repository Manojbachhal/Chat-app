import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './message.schema';
import mongoose, { Types } from 'mongoose';
import path from 'path';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly MessageRepo: mongoose.Model<Message>,
  ) {}

  async create(stringId: string, chatId: string, content: string) {
    let currentUserId = new Types.ObjectId(stringId);
    let chat = new Types.ObjectId(chatId);
    if (!content || !chat) {
      new BadRequestException(
        'Invalid data passed into request for send message',
      );
    }

    let newMessage = {
      sender: currentUserId,
      content,
      chat,
    };

    try {
      let res = (await this.MessageRepo.create(newMessage)).populate({
        path: 'sender',
        select: 'name pic',
        model: 'User',
      });

      res = (await res).populate({
        path: 'chat',
        model: 'Chat',
      });

      // console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  //   get conversation
  async get(chatId: string) {
    let _id = new Types.ObjectId(chatId);
    let res = await this.MessageRepo.find({ chat: _id }).populate({
      path: 'sender',
      select: 'name pic',
      model: 'User',
    });
    // console.log(res);

    return res;
  }
}
