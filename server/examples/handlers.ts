import { db } from "../config";

type Example = {
  id: string;
  name: string;
  value: number;
};

const table = 'example';

export const selectAllExamples = async () => {
  return db<Example>(table).select();
};
