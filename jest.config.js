const path = require('path')
const register = require('ignore-styles').default
register(['.css', '.styl']);

module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  roots: [path.resolve(__dirname, './')],
  testEnvironment: 'jest-environment-jsdom',
  displayName: 'local',
  testMatch: ['**/*.test.ts'],
  testURL: 'http://localhost',
  transformIgnorePatterns: [],
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules"
  }
  // setupFilesAfterEnv: [path.resolve(__dirname, '../src/setupTests.js')],
}
