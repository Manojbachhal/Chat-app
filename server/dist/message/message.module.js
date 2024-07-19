"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModule = void 0;
const common_1 = require("@nestjs/common");
const message_service_1 = require("./message.service");
const mongoose_1 = require("@nestjs/mongoose");
const contacts_schema_1 = require("../contacts/contacts.schema");
const user_schema_1 = require("../users/user.schema");
const chat_schema_1 = require("../chat/chat.schema");
const message_schema_1 = require("./message.schema");
const jwt_1 = require("@nestjs/jwt");
const message_controller_1 = require("./message.controller");
const authrisation_middleware_1 = require("../authrisation/authrisation.middleware");
let MessageModule = class MessageModule {
    configure(Message) {
        Message.apply(authrisation_middleware_1.AuthrisationMiddleware).forRoutes(message_controller_1.MessageController);
    }
};
exports.MessageModule = MessageModule;
exports.MessageModule = MessageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Contact', schema: contacts_schema_1.ContactSchema },
                { name: 'User', schema: user_schema_1.UserSchema },
                { name: 'Chat', schema: chat_schema_1.chatSchema },
                { name: 'Message', schema: message_schema_1.MessageSchema },
            ]),
        ],
        providers: [message_service_1.MessageService, jwt_1.JwtService],
        controllers: [message_controller_1.MessageController],
    })
], MessageModule);
//# sourceMappingURL=message.module.js.map