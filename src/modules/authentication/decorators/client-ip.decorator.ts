import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetClientIP = createParamDecorator((data: unknown, context: ExecutionContext): string | null => {
  const ctx = context.switchToHttp();
  const request = ctx.getRequest<Request>() as any;

  const isApiRestRequest = Boolean(request);

  if (isApiRestRequest) {
    // REST API
    return (request.ip ?? null) as string | null;
  } else {
    // GRAPHQL
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return (request.ip ?? null) as string | null;
  }
});
