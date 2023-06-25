import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../../entities/users.entity';
import { PSQLSession } from '../../../gateways/database/postgresql';
import { UserRepository } from '../../../gateways/database/postgresql/user.repository';

interface UserFindOneParams {
  clientId: string;
  email: string;
}

interface UserCreateParams {
  clientId: string;
  user: UserEntity;
}

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findOne(session: PSQLSession, { clientId, email }: UserFindOneParams): Promise<UserEntity> {
    return this.userRepository.findUserByEmail(session, { email, clientId });
  }

  public async create(session: PSQLSession, { clientId, user }: UserCreateParams): Promise<UserEntity> {
    return this.userRepository.createUser(session, { clientId, user });
  }
}
