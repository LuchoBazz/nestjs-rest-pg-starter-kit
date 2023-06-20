import { Module } from '@nestjs/common';
import { AppController } from './app/controllers/app.controller';
import { AppService } from './app/services/app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';

@Module({
  imports: [AuthenticationModule, UsersModule, OrganizationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
