import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthSucessResponse } from '../dto/auth_sucess.dto';
import { AuthResponse, SignInInput, SignUpInput } from '../dto/sign-up.input';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthInteractor } from '../interactors/auth.interactor';

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
  @Mutation(() => AuthSucessResponse, { nullable: false })
  public async deleteMyAccount(@Context() ctx): Promise<AuthSucessResponse> {
    const { user } = ctx.req;
    return this.authInteractor.deleteMyAccount(user);
  }
}
