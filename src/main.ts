import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { timeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global configuration for exception handling, interceptors, and validation
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new timeoutInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .setTitle('SuperFlight-api')
    .setDescription('Scheduled Flight App')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document, {swaggerOptions: {filter: true}});
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
