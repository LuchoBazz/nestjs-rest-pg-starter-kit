import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../../entities/users/user.entity';
import { PSQLSession } from '../../../gateways/database/postgresql';
import { UpdateUser } from '../dto';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findOne(
    session: PSQLSession,
    { clientId, email }: { clientId: string; email: string },
  ): Promise<UserEntity> {
    return this.userRepository.findByEmail(session, { email, clientId });
  }

  public async create(session: PSQLSession, params: { user: UserEntity }): Promise<UserEntity> {
    return this.userRepository.create(session, params);
  }

  public async update(
    session: PSQLSession,
    params: { clientId: string; email: string; user: UpdateUser },
  ): Promise<UserEntity> {
    return this.userRepository.update(session, params);
  }

  public async delete(session: PSQLSession, params: { user: UserEntity }): Promise<boolean> {
    return this.userRepository.delete(session, params);
  }
}
