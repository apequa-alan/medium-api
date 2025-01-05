import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'john.db.elephantsql.com',
        port: 5432,
        username: 'zhdzmkms',
        password: 'JMkTUtVEfNbLaa60YspC6zcD2W0yRVpU',
        database: 'zhdzmkms',
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true,
        // migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      });

      return dataSource.initialize();
    },
  },
];
