import { ExecutionContext, Optional, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard, AuthModuleOptions } from '@nestjs/passport';
import { contains } from 'class-validator';
import { Observable } from 'rxjs';

export const ALLOW_ANONYMOUS_META_KEY = 'allowAnonymous';

export const AllowAnonymous = () => SetMetadata(ALLOW_ANONYMOUS_META_KEY, true);

export class JwtGuard extends AuthGuard('jwt') {
  constructor(
    @Optional() protected readonly options: AuthModuleOptions,
    private readonly reflector: Reflector,
  ) {
    super(options);
  }

  canActivate(context: ExecutionContext): any | Promise<any> | Observable<any> {
    // Handle anonymous access
    const headers = context.getArgByIndex(0).headers;
    if (contains(headers['authorization'], 'Bearer ')) {
      return AuthGuard('jwt');
    } else {
      const isAnonymousAllowed =
        this.reflector.get<boolean>(
          ALLOW_ANONYMOUS_META_KEY,
          context.getHandler(),
        ) ||
        this.reflector.get<boolean>(
          ALLOW_ANONYMOUS_META_KEY,
          context.getClass(),
        );
      if (isAnonymousAllowed) {
        return { idUser: '', cpf: '' };
      }

      return super.canActivate(context);
    }
  }
}
