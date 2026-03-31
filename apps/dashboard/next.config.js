const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = NextFederationPlugin({
  name: 'dashboard',
  filename: 'static/chunks/remoteEntry.js',
  exposes: {
    './root': './src/components/DashboardRoot.tsx',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.2.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
    '@mfe/shared-types': { singleton: true },
    '@mfe/shared-components': { singleton: true },
  },
});
