import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ErrorValidator } from '../../../common/errors/error.validator';
import { JwtPayload } from '../../../entities/jwt-payload.entity';
import { UserEntity } from '../../../entities/users.entity';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'c1e630b708c741e7875b0ffcd8e8c03a',
      ignoreExpiration: false,
    });
  }

  public async validate(payload: JwtPayload): Promise<UserEntity> {
    const user = await this.authService.validateJwtPayload(payload);
    ErrorValidator.orThrowUnauthorizedError(user, 'INVALID_JWT_TOKEN');
    return user;
  }
}
