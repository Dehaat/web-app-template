module.exports = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.mock.js', 'core-js'],
  collectCoverageFrom: ['src/**/*.{jsx,js,tsx,ts}'],
  moduleDirectories: ['node_modules', 'src', 'app'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
}
