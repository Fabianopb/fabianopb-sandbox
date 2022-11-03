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
        enum: ['portfolio_admin', 'playstation_user'],
      },
      psStoreHash: {
        bsonType: ['null', 'string'],
      },
    },
  },
};
