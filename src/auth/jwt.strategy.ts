import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from './user.entity';
import { Request } from 'express';
import { getCookie } from 'src/lib/cookies';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => getCookie(req, 'Authentication'),
      ]),
      //TODO: 배포시 .env 파일에 보관할것
      secretOrKey: 'root',
    });
  }

  async validate({ username }: { username: string }) {
    const user: User = await this.userRepository.findOne({
      username,
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    return { username };
  }
}
