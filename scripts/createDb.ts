import Knex from 'knex';
import knexfile from '../server/knexfile';
import { getAppEnv } from '../server/utils';

(async () => {
  const appEnv = getAppEnv();
  const config = knexfile[appEnv];
  const devDbName = config.connection.database;
  const knex = Knex({ ...config, connection: { ...config.connection, database: undefined } });

  await knex.raw(`CREATE DATABASE ${devDbName}`);
  await knex.destroy();
})();
