import { Controller, Get, UseGuards } from '@nestjs/common';

import { UserEntity, UserObject } from '../../../entities/users';
import { JwtUser } from '../../authentication/decorators';
import { GetClientIP } from '../../authentication/decorators/client-ip.decorator';
import { JwtAuthGuard } from '../../authentication/guards';
import { UserInteractor } from '../interactors/user.interactor';

@Controller('users')
export class UsersController {
  constructor(private userInteractor: UserInteractor) {}

  @UseGuards(JwtAuthGuard)
  @Get('current')
  public currentUser(@JwtUser() user: UserEntity, @GetClientIP() ip: string | null): Promise<UserObject> {
    console.log({ user, ip });
    return this.userInteractor.findOne({ clientId: user.organization_client_id, email: user.email });
  }
}
