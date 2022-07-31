import { db } from "../config";

type Example = {
  id: string;
  name: string;
  value: number;
};

const exampleTable = 'example';

export const selectAllExamples = async () => {
  return db<Example>(exampleTable).select();
};

export const insertExample = async (example: Omit<Example, 'id'>) => {
  const queryResponse = await db<Example>(exampleTable).insert(example).returning("*");
  return queryResponse[0];
};
