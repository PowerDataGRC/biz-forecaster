import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/auth';

/**
 * Custom decorator to extract the user object from the request.
 * The user object is attached by the FirebaseAuthGuard.
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): DecodedIdToken | undefined => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);