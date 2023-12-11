import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import jwtConfig from '../../common/configuration/jwt.config';
import { AuthGatewayModule } from '../../gateways/auth/auth_gateway.module';
import { FirebaseModule } from '../../gateways/auth/firebase/firebase.module';
import { PostgresqlModule } from '../../gateways/database/postgresql/postgresql.module';
import { AdminModule } from '../admin/admin.module';
import { PermissionService } from '../admin/services/permission.service';
import { OrganizationsModule } from '../organizations/organizations.module';
import { UserService } from '../users/services/user.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { PermissionsGuard } from './guards/permission.guard';
import { AuthInteractor } from './interactors/auth.interactor';
import { AuthPresenter } from './presenters/auth.presenter';
import { AuthTokenStatusesRepository } from './repositories/auth_token_statuses.repository';
import { JwtService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot({
      load: [jwtConfig],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      useFactory: (config: ConfigType<typeof jwtConfig>): JwtModuleOptions => {
        return {
          secret: config.secretKey,
          signOptions: {
            expiresIn: config.expiresIn,
          },
        };
      },
      inject: [jwtConfig.KEY],
    }),
    AdminModule,
    UsersModule,
    FirebaseModule,
    PostgresqlModule,
    forwardRef(() => OrganizationsModule),
    forwardRef(() => AuthGatewayModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthInteractor,
    AuthPresenter,
    JwtService,
    UserService,
    JwtStrategy,
    AuthTokenStatusesRepository,
    PermissionService,
    PermissionsGuard,
    AuthController,
  ],
  exports: [
    JwtService,
    UserService,
    JwtStrategy,
    AuthTokenStatusesRepository,
    PermissionsGuard,
    PermissionService,
    AuthController,
  ],
})
export class AuthenticationModule {}
