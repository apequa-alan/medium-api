import { dataSource } from './data-source';
import { DataSource } from 'typeorm';

require('dotenv').config();

export const ormSeedConfig = {
  ...dataSource,
  migrations: ['db/seeds/*.ts'],
};

export default new DataSource(ormSeedConfig);
