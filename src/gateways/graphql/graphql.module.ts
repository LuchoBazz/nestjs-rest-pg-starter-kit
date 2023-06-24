import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

// import GraphQLJSON from 'graphql-type-json';
import { AuthenticationModule } from '../../modules/authentication/authentication.module';
import { OrganizationsModule } from '../../modules/organizations/organizations.module';
import { UsersModule } from '../../modules/users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // resolvers: { JSON: GraphQLJSON },
      autoSchemaFile: 'schema.gql',
      path: '/api/v1',
      playground: true,
      include: [AuthenticationModule, UsersModule, OrganizationsModule],
    }),
  ],
  providers: [],
})
export class GraphqlModule {}
