import { Injectable } from '@nestjs/common';

import { AuthProvider, AuthType, UserEntity, UserRole } from '../../../entities/users.entity';
import { PSQLSession } from '../../../gateways/database/postgresql';

@Injectable()
export class UserService {
  public async findOne(clientId: string, email: string): Promise<UserEntity> {
    return UserEntity.load({
      username: 'test',
      first_name: 'test',
      last_name: 'test',
      email,
      terms: true,
      notifications: true,
      is_active: true,
      uid: 'abc123',
      role: UserRole.USER,
      auth_provider: AuthProvider.EMAIL_AND_PASSWORD,
      auth_type: AuthType.FIREBASE,
      dynamic_info: {},
      organization_client_id: clientId,
    });
  }

  public async create(session: PSQLSession, clientId: string, _user: any): Promise<UserEntity> {
    console.log(_user);
    return UserEntity.load({
      username: 'test',
      first_name: 'test',
      last_name: 'test',
      email: 'test@test.com',
      terms: true,
      notifications: true,
      is_active: true,
      uid: 'abc123',
      role: UserRole.USER,
      auth_provider: AuthProvider.EMAIL_AND_PASSWORD,
      auth_type: AuthType.FIREBASE,
      dynamic_info: {},
      organization_client_id: clientId,
    });
  }
}
