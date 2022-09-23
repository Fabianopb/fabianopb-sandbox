// import bodyParser from 'body-parser';
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

// router.route('/').post(bodyParser.json(), async (request, response) => {
//   try {
//     const item = new Item(request.body);
//     await item.save();
//     return response.status(200).json('Item saved!');
//   } catch (error) {
//     return response.status(400).send(error);
//   }
// });

export default skills;
