import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { UserEntity } from '../../../entities/users';
import { UpdateUser } from '../dto';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findOne(
    session: PoolClient,
    { clientId, email }: { clientId: string; email: string },
  ): Promise<UserEntity> {
    return this.userRepository.findByEmail(session, { email, clientId });
  }

  public async create(session: PoolClient, params: { user: UserEntity }): Promise<UserEntity> {
    return this.userRepository.create(session, params);
  }

  public async update(
    session: PoolClient,
    params: { clientId: string; email: string; user: UpdateUser },
  ): Promise<UserEntity> {
    return this.userRepository.update(session, params);
  }

  public async delete(session: PoolClient, params: { user: UserEntity }): Promise<boolean> {
    return this.userRepository.delete(session, params);
  }
}
