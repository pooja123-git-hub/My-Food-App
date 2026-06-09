import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { getRequest } from 'src/common/graphql/context';
import { Role } from 'src/role/database/role.entity';
import { Repository } from 'typeorm';

const PermissionGuard = (): Type<CanActivate> => {
  class PermissionGuardMixin implements CanActivate {

    constructor(@InjectRepository(Role) private rolesRepository: Repository<Role>) { }

    async canActivate(context: ExecutionContext) {
      let isAuthorized = false;
      const request = getRequest(context);
      const Roles = request.user.role; // Get current user roles

      const userRole = await this.rolesRepository.findOne({ where: { id: Roles.id } });

      if (userRole) {
        if (userRole?.is_admin) {
          return true; //  admin have all permissions
        };

        const gqlContext = GqlExecutionContext.create(context);
        const info = gqlContext.getInfo();
        const requestName = info.fieldName;

        if (userRole.permissions.includes(requestName)) {
          isAuthorized = true;
        }
      }
      return isAuthorized;
    }
  }

  return mixin(PermissionGuardMixin);
}

export default PermissionGuard;