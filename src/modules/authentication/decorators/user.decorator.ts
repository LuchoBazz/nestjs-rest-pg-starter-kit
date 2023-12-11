import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { UserEntity } from '../../../entities/users';

export const JwtUser = createParamDecorator((data: unknown, context: ExecutionContext): UserEntity => {
  const ctx = context.switchToHttp();
  const request = ctx.getRequest<Request>() as any;

  const isApiRestRequest = Boolean(request);

  if (isApiRestRequest) {
    // REST API
    return request.user as UserEntity;
  } else {
    // GRAPHQL
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return request.user as UserEntity;
  }
});
