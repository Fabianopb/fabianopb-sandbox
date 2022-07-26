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

export const portfolioBadgesSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['name', 'imageSrc', 'href'],
    properties: {
      name: {
        bsonType: 'string',
      },
      imageSrc: {
        bsonType: 'string',
      },
      href: {
        bsonType: 'string',
      },
    },
  },
};

export const portfolioProjectsSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: [
      'title',
      'subtitle',
      'shortDescription',
      'dateRange',
      'images',
      'longDescription',
      'tags',
      'category',
      'thumbnailSrc',
    ],
    properties: {
      title: {
        bsonType: 'string',
      },
      subtitle: {
        bsonType: 'string',
      },
      shortDescription: {
        bsonType: 'string',
      },
      dateRange: {
        bsonType: 'string',
      },
      images: {
        bsonType: 'array',
        items: {
          bsonType: 'string',
        },
      },
      longDescription: {
        bsonType: 'string',
      },
      tags: {
        bsonType: 'array',
        items: {
          bsonType: 'string',
        },
      },
      category: {
        bsonType: 'string',
      },
      thumbnailSrc: {
        bsonType: 'string',
      },
      videoLink: {
        bsonType: 'string',
      },
    },
  },
};
