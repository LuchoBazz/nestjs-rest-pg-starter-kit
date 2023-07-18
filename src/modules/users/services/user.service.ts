import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

import { UserEntity } from '../../../entities/users';
import { UpdateUser } from '../dto';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findOneByEmail(
    manager: PoolClient,
    { clientId, email }: { clientId: string; email: string },
  ): Promise<UserEntity> {
    return this.userRepository.findOneByEmail(manager, { email, clientId });
  }

  public async createOne(manager: PoolClient, params: { user: UserEntity }): Promise<UserEntity> {
    return this.userRepository.createOne(manager, params);
  }

  public async updateOne(
    manager: PoolClient,
    params: { clientId: string; email: string; user: UpdateUser },
  ): Promise<UserEntity> {
    return this.userRepository.updateOne(manager, params);
  }

  public async deleteOne(manager: PoolClient, params: { user: UserEntity }): Promise<boolean> {
    return this.userRepository.deleteOne(manager, params);
  }
}
