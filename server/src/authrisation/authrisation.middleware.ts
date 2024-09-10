import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthrisationMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: any, res: any, next: () => void) {
    let authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer')) {
      try {
        let token = authHeader.split(' ')[1];
        let decodedUser = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        });
        req.user = decodedUser;
        next();
      } catch (error) {
        throw new UnauthorizedException('Invalid Token or expired token');
      }
    } else {
      throw new UnauthorizedException('Token not provided');
    }
  }
}

// For future use in case i want to use cookies
// let Token = req.cookies['Token'];
// console.log(Token);
// if (Token) {
//   try {
//     let user = this.jwtService.verifyAsync(Token);
//     req.user = user;
//     next();
//   } catch (error) {
//     throw new UnauthorizedException('Invalid Token or expired token');
//   }
// } else {
//   throw new UnauthorizedException('Token not provided');
// }
