const path = require('path');

/** @type {import('jest').Config} */
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@ai-seo/shared$': path.resolve(__dirname, '../../packages/shared/src/index.ts'),
    '^@ai-seo/database$': path.resolve(__dirname, '../../packages/database/src/index.ts'),
  },
};
