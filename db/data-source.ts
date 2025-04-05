import { DataSource, DataSourceOptions } from 'typeorm';

require('dotenv').config();

export const dataSource: DataSourceOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.PORT || 5432),
  username: process.env.USERNAME,
  password: process.env.PASS,
  database: process.env.DB,
  synchronize: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['db/migrations/*.ts'],
};

export default new DataSource(dataSource);
