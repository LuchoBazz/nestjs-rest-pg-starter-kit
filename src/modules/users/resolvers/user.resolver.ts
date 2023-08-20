import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { UserEntity, UserObject } from '../../../entities/users';
import { JwtUser } from '../../authentication/decorators';
import { GetClientIP } from '../../authentication/decorators/client-ip.decorator';
import { JwtAuthGuard } from '../../authentication/guards';
import { UserInteractor } from '../interactors/user.interactor';

@Resolver('User')
export class UserResolver {
  constructor(private userInteractor: UserInteractor) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => UserObject, { nullable: false })
  public currentUser(@JwtUser() user: UserEntity, @GetClientIP() ip: string | null): Promise<UserObject> {
    console.log(ip);
    return this.userInteractor.findOne({ clientId: user.organization_client_id, email: user.email });
  }
}
