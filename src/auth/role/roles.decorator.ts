import { SetMetadata } from '@nestjs/common';

export const RolesDec = (...args: string[]) => SetMetadata('roles', args);