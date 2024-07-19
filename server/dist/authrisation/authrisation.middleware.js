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
exports.AuthrisationMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let AuthrisationMiddleware = class AuthrisationMiddleware {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async use(req, res, next) {
        let authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer')) {
            try {
                let token = authHeader.split(' ')[1];
                let decodedUser = await this.jwtService.verifyAsync(token, {
                    secret: 'test@123',
                });
                req.user = decodedUser;
                next();
            }
            catch (error) {
                throw new common_1.UnauthorizedException('Invalid Token or expired token');
            }
        }
        else {
            throw new common_1.UnauthorizedException('Token not provided');
        }
    }
};
exports.AuthrisationMiddleware = AuthrisationMiddleware;
exports.AuthrisationMiddleware = AuthrisationMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthrisationMiddleware);
//# sourceMappingURL=authrisation.middleware.js.map