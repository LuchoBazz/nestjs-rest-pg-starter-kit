import { Module } from '@nestjs/common';

import { PostgresqlModule } from '../../gateways/database/postgresql/postgresql.module';
import { UsersController } from './controllers/user.controller';
import { UserInteractor } from './interactors/user.interactor';
import { PhonePresenter } from './presenters/phone.presenter';
import { UserPresenter } from './presenters/user.presenter';
import { UserRepository } from './repositories/user.repository';
import { UserResolver } from './resolvers/user.resolver';
import { PhoneNumberService } from './services/phone_number.service';
import { UserService } from './services/user.service';

@Module({
  imports: [PostgresqlModule],
  controllers: [UsersController],
  providers: [
    UserService,
    UserRepository,
    PhoneNumberService,
    UserInteractor,
    PhonePresenter,
    UserPresenter,
    UserResolver,
    UsersController,
  ],
  exports: [
    UserService,
    UserRepository,
    PhoneNumberService,
    PhoneNumberService,
    UserInteractor,
    PhonePresenter,
    UserPresenter,
    UserResolver,
    UsersController,
  ],
})
export class UsersModule {}
