import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AuthenticationModule } from '../../modules/authentication/authentication.module';
import { OrganizationsModule } from '../../modules/organizations/organizations.module';
import { SubscriptionModule } from '../../modules/subscription/subscription.module';
import { UsersModule } from '../../modules/users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      path: '/api/v1',
      playground: true,
      include: [AuthenticationModule, UsersModule, OrganizationsModule, SubscriptionModule],
    }),
  ],
  providers: [],
})
export class GraphqlModule {}
