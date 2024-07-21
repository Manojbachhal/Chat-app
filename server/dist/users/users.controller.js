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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const users_service_1 = require("./users.service");
const users_dto_1 = require("../dto/users.dto");
const jwt_1 = require("@nestjs/jwt");
let UsersController = class UsersController {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async getGreeting() {
        return { message: 'hello' };
    }
    async register(data) {
        const saltOrRounds = 10;
        const name = data.name;
        const email = data.email;
        let password = data.password;
        password = await bcrypt.hash(password, saltOrRounds);
        return this.userService.create({ name, email, password });
    }
    async login(data, response) {
        const email = data.email;
        let user = await this.userService.findOne(email);
        if (!user) {
            throw new common_1.BadRequestException('User Not Found');
        }
        if (!bcrypt.compareSync(data.password, user.password)) {
            throw new common_1.BadRequestException('Wrong Password');
        }
        const userObject = user.toObject();
        const { password, ...payload } = userObject;
        let token = await this.jwtService.signAsync(payload);
        response.cookie('Token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        return {
            message: 'success',
            payload,
            token,
        };
    }
    async allUsers(request) {
        const user = request.user;
        return this.userService.getAll();
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getGreeting", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.usersDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.usersDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('/all-users'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "allUsers", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], UsersController);
//# sourceMappingURL=users.controller.js.map