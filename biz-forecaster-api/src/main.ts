import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConsoleLogger } from './console.logger';
import { AllExceptionsFilter } from './common/database-error.filter';

async function bootstrap() {
  // The FirebaseService uses onModuleInit to initialize, so we don't need to do it here.
  // By setting abortOnError to true (or removing it, as true is the default), we ensure that the
  // application exits immediately on the first error, giving us a more accurate stack trace
  // instead of a generic ECONNRESET from a lingering process.
//  const app = await NestFactory.create(AppModule, { logger, abortOnError: true });

  
const app = await NestFactory.create(AppModule, {
  logger: new ConsoleLogger({ prefix: 'BizForecaster' }), abortOnError: true
});

  // Apply the custom exception filter globally
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));


  const configService = app.get(ConfigService);
  const frontendUrl = configService.get<string>('FRONTEND_URL');

  const allowedOrigins = [];

  // For local development, always allow the Next.js dev server
  if (process.env.NODE_ENV !== 'production') {
    allowedOrigins.push('http://localhost:3001');
  }

  // Add the production frontend URL if it's configured
  if (frontendUrl) {
    allowedOrigins.push(frontendUrl);
  }

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(3000);
}
bootstrap();
