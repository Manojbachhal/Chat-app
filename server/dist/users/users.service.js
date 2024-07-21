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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
let UsersService = class UsersService {
    constructor(UserRepo) {
        this.UserRepo = UserRepo;
    }
    async create(data) {
        let alreadyExistingUser = await this.UserRepo.findOne({
            email: data.email,
        });
        if (alreadyExistingUser !== null) {
            throw new common_1.BadRequestException('User already Exists');
        }
        else {
            return this.UserRepo.create(data);
        }
    }
    async findOne(email) {
        return await this.UserRepo.findOne({ email });
    }
    async getAll() {
        let users = await this.UserRepo.find();
        return users;
    }
    async userOnline(id) {
        let user = await this.UserRepo.findByIdAndUpdate(id, { isActive: true });
    }
    async userOffline(id) {
        let user = await this.UserRepo.findByIdAndUpdate(id, { isActive: false });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map