import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
const cookieParser_fix = (cookieParser as any).default || cookieParser;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser_fix());
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Pomodoro API')
    .setDescription('The Pomodoro application API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('tasks')
    .addTag('sessions')
    .addTag('statistics')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:8081'],
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
