module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/styleMock.js',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/fileMock.js',
    '^react-router-dom$': '<rootDir>/src/__mocks__/react-router-dom.js',
  },
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/"
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleDirectories: ['node_modules', 'src'],
};
