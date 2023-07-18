import { SetMetadata } from '@nestjs/common';

import { PermissionsValues } from '../../../entities/authentication';

export const Permissions = (...permissions: PermissionsValues[]) => {
  return SetMetadata('permissions', permissions);
};
