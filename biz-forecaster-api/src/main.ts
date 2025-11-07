import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConsoleLogger } from './core/logging/console.logger';
import { AllExceptionsFilter } from './core/filters/database-error.filter';

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
    allowedOrigins.push('http://localhost:3000');  // Frontend runs on 3000
  }

  // Add the production frontend URL if it's configured
  if (frontendUrl) {
    allowedOrigins.push(frontendUrl);
  }

  // Log CORS configuration
  console.log('Configuring CORS with allowed origins:', allowedOrigins);
  
  // Configure headers to ensure proper JSON responses
  app.use((req, res, next) => {
    res.header('Content-Type', 'application/json');
    next();
  });
  
  app.enableCors({
    origin: (origin, callback) => {
      console.log('Incoming request from origin:', origin);
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.warn('Blocked request from unauthorized origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  await app.listen(3001);
}
bootstrap();
