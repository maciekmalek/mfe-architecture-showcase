module.exports = {
  projects: [
    {
      displayName: 'shared-components',
      preset: './jest-preset.js',
      testMatch: ['<rootDir>/packages/**/src/**/*.spec.ts?(x)'],
      moduleNameMapper: {
        '^@mfe/(.*)$': '<rootDir>/packages/$1/src',
      },
    },
  ],
};
