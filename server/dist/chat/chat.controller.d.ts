import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly ChatService;
    constructor(ChatService: ChatService);
    getchats(request: Request): Promise<(import("mongoose").Document<unknown, {}, import("./chat.schema").Chat> & import("./chat.schema").Chat & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    create(request: Request, body: any): Promise<(import("mongoose").Document<unknown, {}, import("./chat.schema").Chat> & import("./chat.schema").Chat & {
        _id: import("mongoose").Types.ObjectId;
    }) | (import("mongoose").Document<unknown, {}, import("./chat.schema").Chat> & import("./chat.schema").Chat & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
