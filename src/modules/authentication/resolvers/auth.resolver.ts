import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthResponse, AuthSuccessResponse, SignInInput, SignUpInput } from '../dto';
import { JwtAuthGuard } from '../guards';
import { AuthInteractor } from '../interactors';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authInteractor: AuthInteractor) {}

  @Query(() => String)
  hello(): string {
    return 'Hello, World!';
  }

  @Mutation(() => AuthResponse, { nullable: false })
  public async signUp(@Args('input') input: SignUpInput): Promise<AuthResponse> {
    return this.authInteractor.signUp(input);
  }

  @Mutation(() => AuthResponse, { nullable: false })
  public async signIn(@Args('input') input: SignInInput): Promise<AuthResponse> {
    return this.authInteractor.signIn(input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => AuthResponse, { nullable: false })
  public async revokeAndRefreshToken(@Context() ctx): Promise<AuthResponse> {
    const { user } = ctx.req;
    return this.authInteractor.revokeAndRefreshToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => AuthSuccessResponse, { nullable: false })
  public async deleteMyAccount(@Context() ctx): Promise<AuthSuccessResponse> {
    const { user } = ctx.req;
    return this.authInteractor.deleteMyAccount(user);
  }
}
