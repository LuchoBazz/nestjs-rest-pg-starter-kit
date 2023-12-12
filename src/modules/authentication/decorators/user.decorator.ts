import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserEntity } from '../../../entities/users';

export const JwtUser = createParamDecorator((data: unknown, context: ExecutionContext): UserEntity => {
  const ctx = context.switchToHttp();
  const request = ctx.getRequest<Request>() as any;
  return request.user as UserEntity;
});
