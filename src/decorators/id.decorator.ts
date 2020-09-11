import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * @description decorator for id selection from request;
 */
export const Id = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): string | undefined => {
		const request = ctx.switchToHttp().getRequest();

		return request?.user?.id;
	},
);
