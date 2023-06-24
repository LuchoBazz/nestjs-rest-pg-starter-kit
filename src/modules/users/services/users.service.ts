import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../../entities/users.entity';
import { PSQLSession } from '../../../gateways/database/postgresql';
import { createUser, findUserByEmail } from '../../../gateways/database/postgresql/user.postgresql';

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
  public async findOne(session: PSQLSession, { clientId, email }: UserFindOneParams): Promise<UserEntity> {
    return findUserByEmail(session, { email, clientId });
  }

  public async create(session: PSQLSession, { clientId, user }: UserCreateParams): Promise<UserEntity> {
    return createUser(session, { clientId, user });
  }
}
