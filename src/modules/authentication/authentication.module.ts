import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import jwtConfig from '../../common/configuration/jwt.config';
import { AuthModule } from '../../gateways/auth/auth.module';
import { FirebaseModule } from '../../gateways/auth/firebase/firebase.module';
import { PostgresqlModule } from '../../gateways/database/postgresql/postgresql.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { PermissionService } from '../users/services/permission.service';
import { UserService } from '../users/services/user.service';
import { UsersModule } from '../users/users.module';
import { PermissionsGuard } from './guards/permission.guard';
import { AuthInteractor } from './interactors/auth.interactor';
import { AuthPresenter } from './presenters/auth.presenter';
import { AuthTokenStatusesRepository } from './repositories/auth_token_statuses.repository';
import { AuthResolver } from './resolvers/auth.resolver';
import { AuthService } from './services/auth.service';
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
    UsersModule,
    FirebaseModule,
    PostgresqlModule,
    forwardRef(() => OrganizationsModule),
    AuthModule,
  ],
  controllers: [],
  providers: [
    AuthResolver,
    AuthInteractor,
    AuthPresenter,
    AuthService,
    UserService,
    JwtStrategy,
    AuthTokenStatusesRepository,
    PermissionsGuard,
    PermissionService,
  ],
  exports: [AuthService, UserService, JwtStrategy, AuthTokenStatusesRepository, PermissionsGuard],
})
export class AuthenticationModule {}
