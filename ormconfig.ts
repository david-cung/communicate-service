import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '121',
  database: process.env.DB_DATABASE || '121',
  entities: ['../src/**/*.entity.ts'],
  migrations: ['../migrations/**/*.ts'],
  synchronize: false,
});
