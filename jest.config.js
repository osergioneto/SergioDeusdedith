module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/resolvers/*.{ts,js}",
    "src/datasources/*.{ts,js}",
    "src/utils.{ts,js}"
  ],
  coverageDirectory: "./coverage",
};
