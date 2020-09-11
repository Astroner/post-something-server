import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";

export const Protected = (): any =>
	applyDecorators(
		UseGuards(AuthGuard),
	);
