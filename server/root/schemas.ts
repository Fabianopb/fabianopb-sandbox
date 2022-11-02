export const usersSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['username', 'password', 'role'],
    properties: {
      username: {
        bsonType: 'string',
      },
      password: {
        bsonType: 'string',
      },
      role: {
        bsonType: 'string',
      },
    },
  },
};
