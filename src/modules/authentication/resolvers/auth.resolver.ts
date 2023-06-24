import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthResponse, SignInInput, SignUpInput } from '../dto/sign-up.input';
import { AuthInteractor } from '../interactors/auth.interactor';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authInteractor: AuthInteractor) {}

  @Mutation(() => AuthResponse, { nullable: false })
  public async signUp(@Args('input') input: SignUpInput): Promise<AuthResponse> {
    return this.authInteractor.signUp(input);
  }

  @Mutation(() => AuthResponse, { nullable: false })
  public async signIn(@Args('input') input: SignInInput): Promise<AuthResponse> {
    return this.authInteractor.signIn(input);
  }
}
