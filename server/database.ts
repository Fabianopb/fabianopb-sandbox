import { MongoClient, Db, Document } from 'mongodb';
import { PORTFOLIO_SKILLS } from './portfolio/collections';
import { portfolioSkillsSchema } from './portfolio/schemas';

const cloudServer = process.env.APP_ENV !== 'production' ? '' : '+srv';
const user = encodeURIComponent(process.env.MONGO_USERNAME || '');
const password = encodeURIComponent(process.env.MONGO_PASSWORD || '');
const cluster = process.env.MONGO_CLUSTER;
const uri = `mongodb${cloudServer}://${user}:${password}@${cluster}/?retryWrites=true&w=majority`;

const databaseName = process.env.MONGO_DB_NAME;
let client: MongoClient;
export let database: Db;

const setupSchema = async (collectionName: string, validator: Document, exists: boolean) => {
  if (exists) {
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
  await setupSchema(PORTFOLIO_SKILLS, portfolioSkillsSchema, existingCollectionNames.includes(PORTFOLIO_SKILLS));
};

export const close = () => {
  client.close();
};
