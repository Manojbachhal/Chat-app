import { ContactsService } from './contacts.service';
import { ContactDto } from 'src/dto/users.dto';
export declare class ContactsController {
    private readonly contactService;
    constructor(contactService: ContactsService);
    addContact(request: Request, data: ContactDto): Promise<(import("mongoose").Document<unknown, {}, import("./contacts.schema").Contact> & import("./contacts.schema").Contact & Required<{
        _id: unknown;
    }>) | import("@nestjs/common").BadRequestException>;
    getContact(request: Request): Promise<(import("mongoose").Document<unknown, {}, import("./contacts.schema").Contact> & import("./contacts.schema").Contact & Required<{
        _id: unknown;
    }>)[]>;
}
