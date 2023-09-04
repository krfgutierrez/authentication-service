import { Config } from 'jest';

const config: Config = {
  verbose: true,
  // collectCoverage: true,
  testEnvironment: "node",
  rootDir: 'src',
  testRegex: ".*\\.spec\\.ts$",
  coverageDirectory: '/tests/coverage',
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  collectCoverageFrom: [
    "**/*.(t|j)s"
  ],
  moduleNameMapper: {
    "^@root(.*)$": "<rootDir>/src$1",
    "^@interfaces(.*)$": "<rootDir>/src/interfaces$1",
    "^@account(.*)$": "<rootDir>/account/$1",
    "^@database(.*)$": "<rootDir>/database/$1"
  }
};

export default config;