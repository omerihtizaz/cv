import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import cookieSession from 'cookie-session';
import { UsersService } from '../users.service';
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log(request.currentUser);
    return request.currentUser;
  },
);
