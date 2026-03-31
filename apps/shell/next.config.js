const NextFederationPlugin = require('@module-federation/nextjs-mf');

const remotes = () => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return {
      dashboard: 'dashboard@http://localhost:3001/mfe-manifest.json',
      checkout: 'checkout@http://localhost:3002/mfe-manifest.json',
      settings: 'settings@http://localhost:3003/mfe-manifest.json',
    };
  }
  return {
    dashboard: 'dashboard@http://localhost:3001/mfe-manifest.json',
    checkout: 'checkout@http://localhost:3002/mfe-manifest.json',
    settings: 'settings@http://localhost:3003/mfe-manifest.json',
  };
};

module.exports = NextFederationPlugin({
  name: 'shell',
  filename: 'static/chunks/remoteEntry.js',
  remotes: remotes(),
  exposes: {},
  shared: {
    react: { singleton: true, requiredVersion: '^18.2.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
    '@mfe/shared-types': { singleton: true },
    '@mfe/shared-components': { singleton: true },
  },
});
