import Knex from 'knex';
import kenxfile from './knexfile';
import { getAppEnv } from './utils';

const appEnv = getAppEnv();
const db = Knex(kenxfile[appEnv]);

export { db };
