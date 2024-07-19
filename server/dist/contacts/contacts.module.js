"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsModule = void 0;
const common_1 = require("@nestjs/common");
const contacts_controller_1 = require("./contacts.controller");
const contacts_service_1 = require("./contacts.service");
const mongoose_1 = require("@nestjs/mongoose");
const contacts_schema_1 = require("./contacts.schema");
const user_schema_1 = require("../users/user.schema");
const authrisation_middleware_1 = require("../authrisation/authrisation.middleware");
const jwt_1 = require("@nestjs/jwt");
let ContactsModule = class ContactsModule {
    configure(AllContacts) {
        AllContacts.apply(authrisation_middleware_1.AuthrisationMiddleware).forRoutes(contacts_controller_1.ContactsController);
    }
};
exports.ContactsModule = ContactsModule;
exports.ContactsModule = ContactsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Contact', schema: contacts_schema_1.ContactSchema },
                { name: 'User', schema: user_schema_1.UserSchema },
            ]),
        ],
        providers: [contacts_service_1.ContactsService, jwt_1.JwtService],
        controllers: [contacts_controller_1.ContactsController],
    })
], ContactsModule);
//# sourceMappingURL=contacts.module.js.map