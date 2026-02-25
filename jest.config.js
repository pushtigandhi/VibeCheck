module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/testing/setup.js'],
  testMatch: [
    '**/testing/**/*.test.js',
    '**/testing/generated/**/*.test.js'
  ],
  collectCoverageFrom: [
    'screens/**/*.{js,jsx}',
    'components/**/*.{js,jsx}',
    'utils/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/testing/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json'],
  transform: {
    '^.+\.(js|jsx)$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|expo|@expo|react-native-calendars|react-native-dropdown-picker|react-native-element-dropdown|react-native-phone-input|react-native-switch-selector|react-native-tab-view|react-native-worklets)/)'
  ],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@screens/(.*)$': '<rootDir>/screens/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
    '^@constants/(.*)$': '<rootDir>/constants/$1'
  },
  testEnvironment: 'node',
  verbose: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true
};