import { IsNotEmpty, IsString } from 'class-validator';

import { CreateUser } from '../../users/dto';

export class SignUpInput {
  @IsNotEmpty()
  @IsString()
  clientId: string;

  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  userInfo: CreateUser;
}

export class SignInInput {
  @IsNotEmpty()
  @IsString()
  clientId: string;

  @IsNotEmpty()
  @IsString()
  accessToken: string;
}

export class AuthResponse {
  @IsNotEmpty()
  @IsString()
  token: string;
}
