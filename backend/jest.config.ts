export default {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testEnvironment: 'node',
  coverageDirectory: '.coverage',
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'html'],
  detectOpenHandles: true,
  forceExit: true,
  verbose: true,
}
