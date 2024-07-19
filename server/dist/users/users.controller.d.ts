import { UsersService } from './users.service';
import { usersDto } from 'src/dto/users.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Request } from 'express';
import { User } from './user.schema';
export declare class UsersController {
    private readonly userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    getGreeting(): Promise<{
        message: string;
    }>;
    register(data: usersDto): Promise<User>;
    login(data: usersDto, response: Response): Promise<{
        message: string;
        payload: any;
        token: string;
    }>;
    allUsers(request: Request): Promise<User[]>;
}
