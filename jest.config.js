module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/resolvers/*.{ts,js}",
    "src/datasources/*.{ts,js}"
  ],
  coverageDirectory: "./coverage",
};
