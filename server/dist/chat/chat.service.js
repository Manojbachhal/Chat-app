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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const chat_schema_1 = require("./chat.schema");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("../users/user.schema");
let ChatService = class ChatService {
    constructor(userRepo, ChatRepo) {
        this.userRepo = userRepo;
        this.ChatRepo = ChatRepo;
    }
    async get(stringId) {
        const id = new mongoose_1.default.Types.ObjectId(stringId);
        let res = await this.ChatRepo.find({ users: { $in: [stringId] } }).populate({
            path: 'users',
            select: 'name email pic isActive',
            model: 'User',
        });
        return res;
    }
    async create(stringId, body) {
        let ischat = await this.ChatRepo.find({
            isGroupChat: false,
            $and: [{ users: { $all: [stringId, body.contactId] } }],
        }).populate({
            path: 'users',
            select: '-password -isAdmin ',
            model: 'User',
        });
        if (ischat.length > 0) {
            return ischat;
        }
        else {
            let chatData = {
                chatName: 'direct',
                isGroupChat: false,
                users: [stringId, body.contactId],
            };
            try {
                const createdChat = await this.ChatRepo.create(chatData);
                const FullChat = await this.ChatRepo.findOne({
                    _id: createdChat._id,
                }).populate({
                    path: 'users',
                    select: '-password -isAdmin isActive',
                    model: 'User',
                });
                return FullChat;
            }
            catch (error) {
                new common_1.BadRequestException('error while creating chat');
            }
        }
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_2.InjectModel)(chat_schema_1.Chat.name)),
    __metadata("design:paramtypes", [mongoose_1.default.Model, mongoose_1.default.Model])
], ChatService);
//# sourceMappingURL=chat.service.js.map