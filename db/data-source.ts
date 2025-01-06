import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSource: DataSourceOptions = {
  type: 'postgres',
  host: 'john.db.elephantsql.com',
  port: 5432,
  username: 'zhdzmkms',
  password: 'JMkTUtVEfNbLaa60YspC6zcD2W0yRVpU',
  database: 'zhdzmkms',
  synchronize: false,
  entities: ['src/**/*.entity.ts'],
};

export default new DataSource(dataSource);
