import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  url: configService.get<string>('DATABASE_URL'),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false, // Set to false for migrations
  ssl: {
    rejectUnauthorized: false,
  },
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  schema: 'public',
});
