export const playstationWishlistSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['gameId', 'userId'],
    properties: {
      gameId: {
        bsonType: 'string',
      },
      userId: {
        bsonType: 'string',
      },
      imageSrc: {
        bsonType: ['null', 'string'],
      },
    },
  },
};
