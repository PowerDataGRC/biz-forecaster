import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Seeder');
  logger.log('--- Seeding process is temporarily disabled for diagnostics. ---');
  logger.log('If the main application now starts, the issue is isolated to the seeder.');
  process.exit(0);
}

bootstrap();