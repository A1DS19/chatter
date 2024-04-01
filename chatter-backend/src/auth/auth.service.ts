import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { User } from 'src/users/entities/user.entity';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: User, res: Response) {
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + Number(this.configService.get('JWT_EXPIRES_IN')),
    );

    const tokenPayload: TokenPayload = {
      _id: user._id,
      ...user,
    };

    const token = this.jwtService.sign(tokenPayload);

    const isProduction = this.configService.get('NODE_ENV') === 'production';

    res.cookie('Authentication', token, {
      expires,
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
    });
  }

  verifyWs(request: Request): TokenPayload {
    const cookies = request.headers.cookie.split('; ');
    const authCookie = cookies.find((cookie) =>
      cookie.startsWith('Authentication='),
    );
    const token = authCookie?.split('=')[1];
    return this.jwtService.verify(token);
  }

  async logout(res: Response) {
    res.clearCookie('Authentication', {
      expires: new Date(),
      httpOnly: true,
    });
  }
}
