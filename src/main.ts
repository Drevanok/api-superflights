import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { timeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Global configuration for exception handling, interceptors, and validation
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new timeoutInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
