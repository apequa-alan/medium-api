import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'john.db.elephantsql.com',
  port: 5432,
  username: 'zhdzmkms',
  password: 'JMkTUtVEfNbLaa60YspC6zcD2W0yRVpU',
  database: 'zhdzmkms',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default config;
