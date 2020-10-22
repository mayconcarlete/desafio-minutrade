module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/*-protocols.ts',
    '!**/protocols/**',
    '!**/test/**'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@presentation/(.*)': '<rootDir>/src/presentation/$1',
    '@domain/(.*)': '<rootDir>/src/domain/$1',
    '@main/(.*)': '<rootDir>/src/main/$1',
    '@data/(.*)': '<rootDir>/src/data/$1',
    '@infra/(.*)': '<rootDir>/src/infra/$1',
    '@validations/(.*)': '<rootDir>/src/validations/$1'
  }
}
