import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactDto, usersDto } from 'src/dto/users.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactService: ContactsService) {}

  @Post('')
  async addContact(@Req() request: Request, @Body() data: ContactDto) {
    let id = (request as any).user._id;
    let contactId = data.contactId;
    return await this.contactService.createContact(id, contactId);
  }

  @Get('')
  async getContact(@Req() request: Request) {
    let id = (request as any).user._id;
    let res = await this.contactService.get(id);
    return res;
  }
}
