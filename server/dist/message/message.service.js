"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const message_schema_1 = require("./message.schema");
const mongoose_2 = require("mongoose");
let MessageService = class MessageService {
    constructor(MessageRepo) {
        this.MessageRepo = MessageRepo;
    }
    async create(stringId, chatId, content) {
        let currentUserId = new mongoose_2.Types.ObjectId(stringId);
        let chat = new mongoose_2.Types.ObjectId(chatId);
        if (!content || !chat) {
            new common_1.BadRequestException('Invalid data passed into request for send message');
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
            return res;
        }
        catch (error) {
            console.log(error);
        }
    }
    async get(chatId) {
        let _id = new mongoose_2.Types.ObjectId(chatId);
        let res = await this.MessageRepo.find({ chat: _id }).populate({
            path: 'sender',
            select: 'name pic',
            model: 'User',
        });
        return res;
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], MessageService);
//# sourceMappingURL=message.service.js.map