import Knex from 'knex';
import knexfile from '../server/knexfile';
import { getAppEnv } from '../server/utils';

(async () => {
  const appEnv = getAppEnv();
  const config = knexfile[appEnv];
  const devDbName = config.connection.database;

  const initialKnex = Knex({ ...config, connection: { ...config.connection, database: undefined } });
  await initialKnex.raw(`CREATE DATABASE ${devDbName}`);
  await initialKnex.destroy();
  
  const knex = Knex(config);
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.destroy();
})();
