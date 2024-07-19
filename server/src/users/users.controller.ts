import {
  Body,
  Controller,
  Post,
  Get,
  BadRequestException,
  Res,
  Req,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { usersDto } from 'src/dto/users.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Request } from 'express';
import { User } from './user.schema';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Get('/')
  async getGreeting() {
    return { message: 'hello' };
  }

  @Post('register')
  async register(@Body() data: usersDto) {
    const saltOrRounds = 10;
    const name = data.email;
    const email = data.email;
    let password = data.password;

    password = await bcrypt.hash(password, saltOrRounds);

    return this.userService.create({ name, email, password });
  }

  @Post('login')
  async login(
    @Body() data: usersDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const email = data.email;
    let user = await this.userService.findOne(email);
    if (!user) {
      throw new BadRequestException('User Not Found');
    }

    if (!bcrypt.hashSync(data.password, user.password)) {
      throw new BadRequestException('Wrong Password');
    }

    const userObject = user.toObject();
    const { password, ...payload }: any = userObject;

    let token = await this.jwtService.signAsync(payload);

    response.cookie('Token', token, {
      httpOnly: true,
      secure: true, // Enable if using HTTPS
      sameSite: 'none', // Required for cross-site cookies
    });

    return {
      message: 'success',
      payload,
      token,
    };
  }

  @Get('/all-users')
  async allUsers(@Req() request: Request): Promise<User[]> {
    const user = (request as any).user;
    return this.userService.getAll();
  }
}
