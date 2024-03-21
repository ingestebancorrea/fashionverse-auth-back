import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ErrorMessages } from 'src/common/enums/error-messages.enum';
import { Roles } from 'src/common/enums/roles.enum';
import { RolesStates } from 'src/common/enums/states.enums';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}

  matchRoles(roles: string[], userRole: string) {
    return roles.some((role) => role === userRole);
  }

  matchStates(activeRole:string){//Busca el estado correspodiente al rol activo
    const getIndex = Object.keys(Roles).filter(object => {   
      return Roles[object] === activeRole
    });
    if (RolesStates[getIndex[0]] !== undefined)
      return RolesStates[getIndex[0]];
    return null;

  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    const payload = await this.jwtService.verify(
      token,
      {
        secret: process.env.JWT_SECRET
      }
    );

    if(!this.matchRoles(roles, payload.activerole))
      throw new UnauthorizedException(ErrorMessages.UNAUTHORIZED_EXCEPTION)
    request["searchStates"] = this.matchStates(payload.activerole);
  
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}