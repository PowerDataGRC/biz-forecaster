import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();
const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: configService.get<string>('DATABASE_URL'),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false, // Set to false for migrations
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
};

export default new DataSource(dataSourceOptions);
