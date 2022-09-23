import bodyParser from 'body-parser';
import { Router } from 'express';
import { database } from '../database';

type Skill = {
  name: string;
  value: number;
};

const skills = Router();

skills.route('/skills').get(async (_, response) => {
  const collection = database.collection<Skill>('skills');
  const cursor = collection.find();
  const skills = await cursor.toArray();
  return response.status(200).json(skills);
});

skills.route('/skill').post(bodyParser.json(), async (request, response) => {
  try {
    const collection = database.collection<Skill>('skills');
    const skill = request.body;
    await collection.insertOne(skill);
    return response.status(200).json('Item saved!');
  } catch (error) {
    return response.status(400).send(error);
  }
});

export default skills;
