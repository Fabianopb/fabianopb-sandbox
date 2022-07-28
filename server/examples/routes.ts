import { Router } from "express";
import bodyParser from 'body-parser';
import { selectAllExamples, insertExample } from "./handlers";

const router = Router();

router.get('/examples', (async (req, res) => {
  const examples = await selectAllExamples();
  return res.status(200).json(examples);
}));

router.post('/example', bodyParser.json(), (async (req, res) => {
  const newExample = await insertExample(req.body);
  return res.status(200).json(newExample);
}));

export default router;