import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (_data: never, context: ExecutionContext) => {
    return getCurrentUser(context);
  },
);

function getCurrentUser(context: ExecutionContext): User {
  if (context.getType() === 'http') {
    const request = context.switchToHttp().getRequest();
    return request.user;
  } else if (context.getType<GqlContextType>() === 'graphql') {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  }
}
