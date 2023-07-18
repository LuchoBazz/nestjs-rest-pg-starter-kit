import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { UserEntity } from '../../../entities/users';
import { UpdateUser } from '../dto';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findOne(
    manager: PoolClient,
    { clientId, email }: { clientId: string; email: string },
  ): Promise<UserEntity> {
    return this.userRepository.findByEmail(manager, { email, clientId });
  }

  public async create(manager: PoolClient, params: { user: UserEntity }): Promise<UserEntity> {
    return this.userRepository.create(manager, params);
  }

  public async update(
    manager: PoolClient,
    params: { clientId: string; email: string; user: UpdateUser },
  ): Promise<UserEntity> {
    return this.userRepository.update(manager, params);
  }

  public async delete(manager: PoolClient, params: { user: UserEntity }): Promise<boolean> {
    return this.userRepository.delete(manager, params);
  }
}
