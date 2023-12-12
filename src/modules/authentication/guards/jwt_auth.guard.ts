import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  public getRequest(context: ExecutionContext): any {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>() as any;
    return request;
  }

  public handleRequest(err: Error, user: any): any {
    if (err || !user) {
      throw err || new UnauthorizedException('FAILED_TO_AUTHENTICATE_WIHT_TOKEN');
    }
    return user;
  }
}
