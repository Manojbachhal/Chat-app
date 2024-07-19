import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthrisationMiddleware } from 'src/authrisation/authrisation.middleware';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: 'test@123',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {
  configure(AllUsers: MiddlewareConsumer) {
    AllUsers.apply(AuthrisationMiddleware).forRoutes(
      {
        path: 'users/all-users',
        method: RequestMethod.GET,
      },
      { path: 'users/add-contact', method: RequestMethod.POST },
      { path: 'users/get-contact', method: RequestMethod.GET },
    );
  }
}
