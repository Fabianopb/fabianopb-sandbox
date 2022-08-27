/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./setupTests.ts'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg|woff|woff2)$': '<rootDir>/src/mocks/fileMock.ts',
    '^d3-(.*)$': `<rootDir>/node_modules/d3-$1/dist/d3-$1`,
  },
};
