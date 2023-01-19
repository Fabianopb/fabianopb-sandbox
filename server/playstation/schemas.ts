export const playstationWishlistSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['gameId', 'userId', 'name', 'data', 'updatedAt'],
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
      updatedAt: {
        bsonType: 'int',
      },
      imageSrc: {
        bsonType: ['null', 'string'],
      },
      isOwned: {
        bsonType: 'bool',
      },
      isPlayed: {
        bsonType: 'bool',
      },
    },
  },
};
