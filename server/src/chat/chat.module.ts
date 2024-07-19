import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/user.schema';
import { ContactSchema } from 'src/contacts/contacts.schema';
import { JwtService } from '@nestjs/jwt';
import { ChatController } from './chat.controller';
import { AuthrisationMiddleware } from 'src/authrisation/authrisation.middleware';
import { chatSchema } from './chat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Contact', schema: ContactSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Chat', schema: chatSchema },
    ]),
  ],

  providers: [ChatService, JwtService],
  controllers: [ChatController],
})
export class ChatModule {
  configure(Chats: MiddlewareConsumer) {
    Chats.apply(AuthrisationMiddleware).forRoutes(ChatController);
  }
}
