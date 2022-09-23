export const portfolioSkillsSchema = {
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
