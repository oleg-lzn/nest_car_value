import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest(); // getting the underlying request coming to the app
    console.log(request.session.userId);
    return request.currentUser;
  },
);
