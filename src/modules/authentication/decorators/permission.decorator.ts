import { SetMetadata } from '@nestjs/common';

import { PermissionsValues } from '../../../entities/authentication/permission.enum';

export const Permissions = (...permissions: PermissionsValues[]) => {
  return SetMetadata('permissions', permissions);
};
