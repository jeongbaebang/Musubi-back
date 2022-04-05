import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          let token = null;

          if (request && request.cookies) {
            token = request.cookies['Authentication'];
          }
          return token;
        },
      ]),
      //TODO: 배포시 .env 파일에 보관할것
      secretOrKey: 'root',
    });
  }

  async validate(payload) {
    const user: User = await this.userRepository.findOne({
      username: payload?.username,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
