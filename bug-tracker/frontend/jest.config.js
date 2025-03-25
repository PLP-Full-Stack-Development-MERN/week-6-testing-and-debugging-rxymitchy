export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '\\.(css|scss)$': 'identity-obj-proxy'
    },
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { 
        presets: [
          '@babel/preset-env',
          ['@babel/preset-react', { runtime: 'automatic' }]
        ] 
      }]
    }
  }