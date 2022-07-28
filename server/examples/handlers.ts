import { db } from "../config";

type Example = {
  id: string;
  name: string;
  value: number;
};

const exampleQueryBuilder = db<Example>('example');

export const selectAllExamples = async () => {
  return exampleQueryBuilder.select();
};

export const insertExample = async (example: Omit<Example, 'id'>) => {
  const queryResponse = await exampleQueryBuilder.insert(example).returning("*");
  return queryResponse[0];
};
