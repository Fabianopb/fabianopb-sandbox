export const playstationWishlistSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['gameId'],
    properties: {
      gameId: {
        bsonType: 'string',
      },
      imageSrc: {
        bsonType: ['null', 'string'],
      },
    },
  },
};
