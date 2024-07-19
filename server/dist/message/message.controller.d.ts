import { MessageService } from './message.service';
export declare class MessageController {
    private readonly MessageService;
    constructor(MessageService: MessageService);
    startConvo(request: Request, data: any): Promise<Omit<import("mongoose").Document<unknown, {}, import("./message.schema").Message> & import("./message.schema").Message & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    getMesssage(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./message.schema").Message> & import("./message.schema").Message & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
