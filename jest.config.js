module.exports = {
  projects: [
    {
      displayName: 'shell',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/apps/shell/**/*.{spec,test}.{js,ts,jsx,tsx}'],
      moduleNameMapper: {
        '^@mfe/(.*)$': '<rootDir>/packages/$1/src',
      },
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    },
    {
      displayName: 'dashboard',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/apps/dashboard/**/*.{spec,test}.{js,ts,jsx,tsx}'],
      moduleNameMapper: {
        '^@mfe/(.*)$': '<rootDir>/packages/$1/src',
      },
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    },
    {
      displayName: 'checkout',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/apps/checkout/**/*.{spec,test}.{js,ts,jsx,tsx}'],
      moduleNameMapper: {
        '^@mfe/(.*)$': '<rootDir>/packages/$1/src',
      },
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    },
    {
      displayName: 'settings',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/apps/settings/**/*.{spec,test}.{js,ts,jsx,tsx}'],
      moduleNameMapper: {
        '^@mfe/(.*)$': '<rootDir>/packages/$1/src',
      },
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    },
  ],
};
