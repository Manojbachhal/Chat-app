import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserRepo: mongoose.Model<User>) {}

  async create(data: any): Promise<User> {
    let alreadyExistingUser = await this.UserRepo.findOne({
      email: data.email,
    });

    if (alreadyExistingUser !== null) {
      throw new BadRequestException('User already Exists');
    } else {
      return this.UserRepo.create(data);
    }
  }

  async findOne(email: string): Promise<User> {
    return await this.UserRepo.findOne({ email });
  }

  async getAll(): Promise<User[]> {
    let users = await this.UserRepo.find();
    return users;
  }

  async userOnline(id: string) {
    let user = await this.UserRepo.findByIdAndUpdate(id, { isActive: true });
  }
  async userOffline(id: string) {
    let user = await this.UserRepo.findByIdAndUpdate(id, { isActive: false });
  }
}
