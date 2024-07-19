import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsersService } from 'src/users/users.service';
export declare class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    private readonly userService;
    private readonly logger;
    constructor(userService: UsersService);
    userid: string;
    io: Server;
    afterInit(server: any): void;
    handleConnection(client: any, ...args: any[]): Promise<void>;
    handleActiveState(client: Socket, userId: string): Promise<void>;
    handleSetup(client: Socket, payload: any): void;
    handleDisconnect(client: any): Promise<void>;
    handleMessage(client: any, data: any): any;
}
