import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  public getRequest(context: ExecutionContext): any {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return request;
  }

  public handleRequest(err: Error, user: any): any {
    if (err || !user) {
      throw err || new UnauthorizedException('FAILED_TO_AUTHENTICATE_WIHT_TOKEN');
    }
    return user;
  }
}
