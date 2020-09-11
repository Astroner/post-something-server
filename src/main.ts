import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

import env from './env';

console.log({ env })

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.enableCors();
	await app.listen(env.PORT, env.HOST, () => console.log(`Started`));
}
bootstrap();
