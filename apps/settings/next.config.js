const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = NextFederationPlugin({
  name: 'settings',
  filename: 'static/chunks/remoteEntry.js',
  exposes: {
    './root': './src/components/SettingsRoot.tsx',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.2.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
    '@mfe/shared-types': { singleton: true },
    '@mfe/shared-components': { singleton: true },
  },
});
