import { Module } from '@nestjs/common';

import { UserRepository } from './repositories/user.repository';
import { PhoneNumberService } from './services/phone_number.service';
import { UserService } from './services/user.service';

@Module({
  imports: [],
  providers: [UserService, UserRepository, PhoneNumberService],
  exports: [UserService, UserRepository, PhoneNumberService],
})
export class UsersModule {}
