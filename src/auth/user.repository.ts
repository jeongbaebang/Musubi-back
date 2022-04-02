import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { AuthCredentialsDto, validationTest } from './dto/auth.credential';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser({ username, password }: AuthCredentialsDto): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const user = this.create({ username, password: hashedPassword });
      await this.save(user);
    } catch (error) {
      /**
       * @see https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html#error_er_dup_entry
       */
      if (error.errno === 1062) {
        throw new ConflictException(validationTest.login.duplicate);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
