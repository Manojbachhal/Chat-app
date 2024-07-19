import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly ChatService: ChatService) {}

  @Get()
  async getchats(@Req() request: Request) {
    let id = (request as any).user._id;
    let res = await this.ChatService.get(id);
    return res;
  }

  @Post()
  async create(@Req() request: Request, @Body() body) {
    let id = (request as any).user._id;
    let res = await this.ChatService.create(id, body);
    return res;
  }
}
