import { IsBoolean } from 'class-validator';

import { JwtPayload } from '../../../entities/authentication';

export interface CreateJWTOutput {
  data: JwtPayload;
  token: string;
}

export class AuthSuccessResponse {
  @IsBoolean()
  success: boolean;
}
