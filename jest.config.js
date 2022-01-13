module.exports = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.mock.js', 'core-js'],
  collectCoverageFrom: ['src/**/*.{jsx,js,tsx,ts}'],
  moduleDirectories: ['node_modules', 'src', 'app'],
  coveragePathIgnorePatterns: [
    'src/index.tsx',
    'src/webpack/*',
    'src/store/create-store.ts',
    'src/store/reducer.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
}
