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
  await setupSchemas();
};

export const setupSchemas = async () => {
  const skillsValidator = {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'value'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        value: {
          bsonType: 'int',
          minimum: 0,
          maximum: 100,
          description: 'must be an integer [0, 100] and is required',
        },
      },
    },
  };
  const skillsCollection = database.collection('skills');
  if (skillsCollection) {
    await database.command({ collMod: 'skills', validator: skillsValidator });
  } else {
    await database.createCollection('skills', { validator: skillsValidator });
  }
};

export const close = () => {
  client.close();
};
