export const usersSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['username', 'password', 'roles'],
    properties: {
      username: {
        bsonType: 'string',
      },
      password: {
        bsonType: 'string',
      },
      roles: {
        bsonType: 'array',
        items: {
          enum: ['portfolio_admin', 'playstation_user'],
        },
      },
      psStoreHash: {
        bsonType: ['null', 'string'],
      },
    },
  },
};
