import { AuthCredentialsDto } from './dto/auth.credential';
import { EntityRepository, Repository } from 'typeorm';

import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser({ username, password }: AuthCredentialsDto): Promise<void> {
    const user = this.create({ username, password });
    await this.save(user);
  }
}
