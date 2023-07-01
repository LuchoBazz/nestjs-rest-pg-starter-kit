import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../../entities/users.entity';
import { PSQLSession } from '../../../gateways/database/postgresql';
import { UserRepository } from '../repository/user.repository';

interface UserFindOneParams {
  clientId: string;
  email: string;
}

interface UserCreateParams {
  user: UserEntity;
}

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findOne(session: PSQLSession, { clientId, email }: UserFindOneParams): Promise<UserEntity> {
    return this.userRepository.findUserByEmail(session, { email, clientId });
  }

  public async create(session: PSQLSession, { user }: UserCreateParams): Promise<UserEntity> {
    return this.userRepository.createUser(session, { user });
  }

  public async delete(session: PSQLSession, { user }: UserCreateParams): Promise<boolean> {
    return this.userRepository.delete(session, { user });
  }
}
