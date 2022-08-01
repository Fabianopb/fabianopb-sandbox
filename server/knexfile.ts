import { parse } from 'pg-connection-string';

const prodConnection = parse(process.env.DATABASE_URL || '');

const knexConfig = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'postgres',
      database: 'fabianopb_dev',
    },
    migrations: {
      directory: './migrations',
    },
  },

  test: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'postgres',
      database: 'fabianopb_test',
    },
    migrations: {
      directory: './migrations',
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: prodConnection.host || '',
      user: prodConnection.user || '',
      password: prodConnection.password || '',
      database: prodConnection.database || '',
      port: Number(prodConnection.port || 5432),
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: './migrations',
    },
  },
};

export default knexConfig;
