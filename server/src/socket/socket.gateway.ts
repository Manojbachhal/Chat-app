import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway({
  cors: {
    origin: '*', // for deployed app
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class SocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private readonly logger = new Logger(SocketGateway.name);

  constructor(private readonly userService: UsersService) {}
  userid: string;

  @WebSocketServer() io: Server;

  afterInit(server: any) {
    this.logger.log('Initialized');
  }

  async handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.io.sockets;

    this.logger.log(`Client id: ${client.id} connected`);
    await this.userService.userOnline(this.userid);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  @SubscribeMessage('activeState')
  async handleActiveState(client: Socket, userId: string) {
    this.userid = userId;
    // console.log(userId, 'vhjv');
    await this.userService.userOnline(userId);
  }

  @SubscribeMessage('setup')
  handleSetup(client: Socket, payload: any) {
    client.join(payload);
    this.logger.debug(`User joined room number : ${payload}`);
  }

  async handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
    await this.userService.userOffline(this.userid);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, data: any): any {
    let users = data.payload.chat.users;
    for (let user of users) {
      if (user !== data.payload.sender._id) {
        this.io.to(data.roomId).emit('message-received', data.payload);
      }
    }
  }
}
