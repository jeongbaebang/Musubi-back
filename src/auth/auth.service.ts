import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { AuthCredentialsDto, validationTest } from './dto/auth.credential';
import { UserRepository } from './user.repository';
import { createAuthCookie } from 'src/lib/cookies';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  private async isUser(user: User, bodyPassword: string) {
    return Boolean(user && (await bcrypt.compare(bodyPassword, user.password)));
  }

  private createToken(user: User) {
    return this.jwtService.sign({ username: user.username });
  }

  async signUp(authCredentialsDto: AuthCredentialsDto, response: Response) {
    await this.userRepository.createUser(authCredentialsDto);
    return await this.signIn(authCredentialsDto, response);
  }

  async signIn({ username, password }: AuthCredentialsDto, response: Response) {
    const user = await this.userRepository.findOne({ username });

    if (await this.isUser(user, password)) {
      createAuthCookie(response, this.createToken(user));

      return {
        message: [validationTest.login.success.message],
        user: user.username,
      };
    } else {
      throw new UnauthorizedException([validationTest.login.failure.message]);
    }
  }
}
