import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { SignUpInput, SignUpResponse } from '../dto/sign-up.input';
import { AuthInteractor } from '../interactors/auth.interactor';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authInteractor: AuthInteractor) {}

  @Mutation(() => SignUpResponse, { nullable: false })
  public async signUp(@Args('input') input: SignUpInput): Promise<SignUpResponse> {
    return this.authInteractor.signUp(input);
  }
}
