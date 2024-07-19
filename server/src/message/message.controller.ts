import { Controller, Post, Req, Body, Get, Param } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly MessageService: MessageService) {}

  @Post()
  async startConvo(@Req() request: Request, @Body() data: any) {
    let id = (request as any).user._id;
    let res = await this.MessageService.create(id, data.chatId, data.content);
    return res;
  }

  @Get(':id')
  async getMesssage(@Param('id') id: string) {
    let res = await this.MessageService.get(id);
    return res;
  }
}
