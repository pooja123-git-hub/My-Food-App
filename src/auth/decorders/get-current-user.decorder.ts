import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getRequest } from 'src/common/graphql/context';
import { JwtPayloadWithRt } from '../type/jwt-refreshToken-payload.type';

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithRt | undefined, context: ExecutionContext) => {
    const request = getRequest(context);
    if (!data) return request.user;
    return request.user[data];
  },
);