import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { orThrowError } from '@open-syk/common/errors';

export class ErrorValidator {
  @orThrowError(BadRequestException)
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  static orThrowBadRequestError(response: any, messageError: string) {}

  @orThrowError(UnauthorizedException)
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  static orThrowUnauthorizedError(response: any, messageError: string) {}

  @orThrowError(NotFoundException)
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  static orThrowNotFoundError(response: any, messageError: string) {}

  @orThrowError(InternalServerErrorException)
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  static orThrowInternalServerError(response: any, messageError: string) {}
}
