import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //solo permite data que está definida en el DTO
      forbidNonWhitelisted: true, //lanza un error si hay data no permitida
    })
  )

  await app.listen(3000);
}
bootstrap();
