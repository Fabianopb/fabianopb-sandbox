import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGO_URI;
let client: MongoClient;
export let database: Db;

export const init = async () => {
  if (!uri) {
    throw new Error('MONGO_URI is not defined in the environment!');
  }
  client = new MongoClient(uri);
  await client.connect();
  database = client.db('fabianopb_sandbox');
};

export const close = () => {
  client.close();
};
