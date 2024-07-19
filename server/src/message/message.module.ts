import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactSchema } from 'src/contacts/contacts.schema';
import { UserSchema } from 'src/users/user.schema';
import { chatSchema } from 'src/chat/chat.schema';
import { MessageSchema } from './message.schema';
import { JwtService } from '@nestjs/jwt';
import { MessageController } from './message.controller';
import { AuthrisationMiddleware } from 'src/authrisation/authrisation.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Contact', schema: ContactSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Chat', schema: chatSchema },
      { name: 'Message', schema: MessageSchema },
    ]),
  ],
  providers: [MessageService, JwtService],
  controllers: [MessageController],
})
export class MessageModule {
  configure(Message: MiddlewareConsumer) {
    Message.apply(AuthrisationMiddleware).forRoutes(MessageController);
  }
}
