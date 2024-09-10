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
var SocketGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
let SocketGateway = SocketGateway_1 = class SocketGateway {
    constructor(userService) {
        this.userService = userService;
        this.logger = new common_1.Logger(SocketGateway_1.name);
    }
    afterInit(server) {
        this.logger.log('Initialized');
    }
    async handleConnection(client, ...args) {
        const { sockets } = this.io.sockets;
        this.logger.log(`Client id: ${client.id} connected`);
        await this.userService.userOnline(this.userid);
        this.logger.debug(`Number of connected clients: ${sockets.size}`);
    }
    async handleActiveState(client, userId) {
        this.userid = userId;
        await this.userService.userOnline(userId);
    }
    handleSetup(client, payload) {
        client.join(payload);
        this.logger.debug(`User joined room number : ${payload}`);
    }
    async handleDisconnect(client) {
        this.logger.log(`Cliend id:${client.id} disconnected`);
        await this.userService.userOffline(this.userid);
    }
    handleMessage(client, data) {
        let users = data.payload.chat.users;
        for (let user of users) {
            if (user !== data.payload.sender._id) {
                this.io.to(data.roomId).emit('message-received', data.payload);
            }
        }
    }
};
exports.SocketGateway = SocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SocketGateway.prototype, "io", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('activeState'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "handleActiveState", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('setup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], SocketGateway.prototype, "handleSetup", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], SocketGateway.prototype, "handleMessage", null);
exports.SocketGateway = SocketGateway = SocketGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: 'https://chat-app-henna-two.vercel.app',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], SocketGateway);
//# sourceMappingURL=socket.gateway.js.map