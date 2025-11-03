import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

// Explicitly load environment variables from the .env file.
// This is crucial for the TypeORM CLI to get the database URL.
config();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  // Directly use process.env after loading dotenv.
  // Appending sslmode=require is essential for many cloud providers.
  url: (process.env.DATABASE_URL || '').includes('sslmode') ? process.env.DATABASE_URL : `${process.env.DATABASE_URL}?sslmode=require`,
  // This glob pattern causes a conflict during application startup.
  // It should be empty here to allow the NestJS runtime to use the configurations
  // from `TypeOrmModule.forFeature()` in each module, which is the correct approach.
  entities: [],
  synchronize: false, // Set to false for migrations
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
};

export default new DataSource(dataSourceOptions);
