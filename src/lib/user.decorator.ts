import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetAllUserInfo = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
