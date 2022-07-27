import { Router } from "express";
import { selectAllExamples } from "./handlers";

const router = Router();

router.get('/examples', (async (req, res) => {
    const messages = await selectAllExamples();
    return res.status(200).json(messages);
  }),
);

export default router;