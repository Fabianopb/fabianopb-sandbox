export const portfolioSkillsSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['name', 'value', 'type'],
    properties: {
      name: {
        bsonType: 'string',
      },
      value: {
        bsonType: 'int',
        minimum: 0,
        maximum: 100,
      },
      type: {
        enum: ['skill', 'tool'],
      },
    },
  },
};

export const portfolioUsersSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['username', 'password'],
    properties: {
      username: {
        bsonType: 'string',
      },
      password: {
        bsonType: 'string',
      },
    },
  },
};
