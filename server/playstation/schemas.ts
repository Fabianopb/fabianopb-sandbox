export const playstationWishlistSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['gameId', 'userId', 'name', 'data'],
    properties: {
      gameId: {
        bsonType: 'string',
      },
      userId: {
        bsonType: 'string',
      },
      name: {
        bsonType: 'string',
      },
      data: {
        bsonType: 'object',
      },
      imageSrc: {
        bsonType: ['null', 'string'],
      },
    },
  },
};
