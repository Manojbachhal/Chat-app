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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const jwt_1 = require("@nestjs/jwt");
const authrisation_middleware_1 = require("../authrisation/authrisation.middleware");
const user_schema_1 = require("./user.schema");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
let UsersModule = class UsersModule {
    constructor() {
        console.log('JWT_SECRET:', process.env.JWT_SECRET);
    }
    configure(AllUsers) {
        AllUsers.apply(authrisation_middleware_1.AuthrisationMiddleware).forRoutes({
            path: 'users/all-users',
            method: common_1.RequestMethod.GET,
        }, { path: 'users/add-contact', method: common_1.RequestMethod.POST }, { path: 'users/get-contact', method: common_1.RequestMethod.GET });
    }
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '1d' },
            }),
        ],
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService],
        controllers: [users_controller_1.UsersController],
    }),
    __metadata("design:paramtypes", [])
], UsersModule);
//# sourceMappingURL=users.module.js.map