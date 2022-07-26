import { MongoClient, Db, Document } from 'mongodb';
import { PORTFOLIO_BADGES, PORTFOLIO_PROJECTS, PORTFOLIO_SKILLS } from './portfolio/collections';
import { portfolioBadgesSchema, portfolioProjectsSchema, portfolioSkillsSchema } from './portfolio/schemas';
import { USERS } from './root/collections';
import { usersSchema } from './root/schemas';

const cloudServer = process.env.APP_ENV !== 'production' ? '' : '+srv';
const user = encodeURIComponent(process.env.MONGO_USERNAME || '');
const password = encodeURIComponent(process.env.MONGO_PASSWORD || '');
const cluster = process.env.MONGO_CLUSTER;
const uri = `mongodb${cloudServer}://${user}:${password}@${cluster}/?retryWrites=true&w=majority`;

const databaseName = process.env.MONGO_DB_NAME;
let client: MongoClient;
export let database: Db;

const createSchemaSetter =
  (existingCollectionNames: string[]) => async (collectionName: string, validator: Document) => {
    if (existingCollectionNames.includes(collectionName)) {
      await database.command({ collMod: collectionName, validator });
    } else {
      await database.createCollection(collectionName, { validator });
    }
  };

export const init = async () => {
  if (!uri) {
    throw new Error('MONGO_URI is not defined in the environment!');
  }
  if (!databaseName) {
    throw new Error('MONGO_DB_NAME is not defined in the environment!');
  }
  client = new MongoClient(uri);

  await client.connect();
  database = client.db(databaseName);

  const collections = await database.collections();
  const existingCollectionNames = collections.map((c) => c.collectionName);
  const setupSchema = createSchemaSetter(existingCollectionNames);

  await setupSchema(USERS, usersSchema);

  await setupSchema(PORTFOLIO_SKILLS, portfolioSkillsSchema);
  await setupSchema(PORTFOLIO_BADGES, portfolioBadgesSchema);
  await setupSchema(PORTFOLIO_PROJECTS, portfolioProjectsSchema);
};

export const close = () => {
  client.close();
};
