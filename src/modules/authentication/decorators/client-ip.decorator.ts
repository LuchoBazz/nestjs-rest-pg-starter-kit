import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetClientIP = createParamDecorator((data: unknown, context: ExecutionContext): string | null => {
  const ctx = context.switchToHttp();
  const request = ctx.getRequest<Request>();

  const isApiRestRequest = Boolean(request);

  if (isApiRestRequest) {
    // REST API
    throw new BadRequestException('REQUEST_BY_REST_API_NOT_YET_SUPPORTED');
  } else {
    // GRAPHQL
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return (request.ip ?? null) as string | null;
  }
});
