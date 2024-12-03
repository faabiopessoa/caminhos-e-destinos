module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Mapeia o alias @ para a pasta src
  },
  setupFilesAfterEnv: ["<rootDir>/node_modules/@testing-library/jest-dom"]
};
