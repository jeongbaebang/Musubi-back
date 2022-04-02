import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { AuthCredentialsDto } from './dto/auth.credential';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }
}
