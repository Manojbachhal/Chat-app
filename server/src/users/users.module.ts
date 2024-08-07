import {
  Inject,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthrisationMiddleware } from 'src/authrisation/authrisation.middleware';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'process';
import { ConfigModule } from '@nestjs/config';

// @Inject(envM)
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {
  constructor() {
    console.log('JWT_SECRET:', process.env.JWT_SECRET); // Add this line
  }
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
