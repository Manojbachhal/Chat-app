import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactSchema } from './contacts.schema';
import { UserSchema } from 'src/users/user.schema';
import { AuthrisationMiddleware } from 'src/authrisation/authrisation.middleware';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Contact', schema: ContactSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [ContactsService, JwtService],
  controllers: [ContactsController],
})
export class ContactsModule {
  configure(AllContacts: MiddlewareConsumer) {
    AllContacts.apply(AuthrisationMiddleware).forRoutes(ContactsController);
  }
}
