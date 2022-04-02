import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { AuthCredentialsDto, validationTest } from './dto/auth.credential';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser({ username, password }: AuthCredentialsDto): Promise<void> {
    try {
      const user = this.create({ username, password });
      await this.save(user);
    } catch (error) {
      /**
       * @see https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html#error_er_dup_entry
       */
      if (error.errno === 1062) {
        throw new ConflictException(validationTest.duplicateUsername.message);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
