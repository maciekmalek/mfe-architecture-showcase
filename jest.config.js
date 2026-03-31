module.exports = {
  projects: [
    {
      displayName: 'packages',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/packages/**/src/**/*.spec.ts?(x)'],
      moduleNameMapper: {
        '^@mfe/(.*)$': '<rootDir>/packages/$1/src',
      },
    },
  ],
};
