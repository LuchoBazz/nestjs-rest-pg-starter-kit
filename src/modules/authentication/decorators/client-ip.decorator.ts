import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetClientIP = createParamDecorator((data: unknown, context: ExecutionContext): string | null => {
  const ctx = context.switchToHttp();
  const request = ctx.getRequest<Request>() as any;
  return (request.ip ?? null) as string | null;
});
