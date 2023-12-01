import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
	new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true,
		transform: true,
	}),
	);
  	const port = process.env.PORT || 3000;
	app.enableCors();
  	await app.listen(3000);
 	console.log(`Server is running on port ${port}`);
}
bootstrap();
