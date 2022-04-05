import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { AuthCredentialsDto, validationTest } from './dto/auth.credential';
import { UserRepository } from './user.repository';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn({ username, password }: AuthCredentialsDto, response: Response) {
    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const TOKEN = this.jwtService.sign({ username });

      response.cookie('Authentication', TOKEN, {
        //TODO: 배포시 .env 파일에 보관할것
        maxAge: 86400000, // 1d
        httpOnly: true,
      });

      return {
        message: validationTest.login.success,
        user,
        token: TOKEN,
      };
    } else {
      throw new UnauthorizedException(validationTest.login.failure);
    }
  }
}
