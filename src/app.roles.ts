import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  AUTHOR = 'AUTHOR',
  ADMIN = 'ADMIN',
}

export enum AppResource {
  USER = 'USER',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  // AUTHOR ROLES
  .grant(AppRoles.AUTHOR)
  .readOwn([AppResource.USER])
  .updateOwn([AppResource.USER])
  .deleteOwn([AppResource.USER])
  // ADMIN ROLES
  .grant(AppRoles.ADMIN)
  .extend(AppRoles.AUTHOR)
  .createAny([AppResource.USER]);
