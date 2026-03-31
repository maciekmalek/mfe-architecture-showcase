# Development Guide

## Prerequisites

- Node.js 18+
- pnpm 8+

## Project Setup

### 1. Install Dependencies
```bash
pnpm install
```

## Development Workflow

### Running All Apps Simultaneously

**Option A: Separate Terminals**
```bash
# Terminal 1
cd apps/shell && pnpm dev

# Terminal 2
cd apps/dashboard && pnpm dev

# Terminal 3
cd apps/checkout && pnpm dev

# Terminal 4
cd apps/settings && pnpm dev
```

Then access at: http://localhost:3000

**Option B: Using Nx (Recommended)**
```bash
pnpm nx run-many --targets=dev --all --parallel
```

### Building for Production
```bash
pnpm build
```

## Testing

### Unit Tests
```bash
# Run all tests once
pnpm test

# Watch mode
pnpm test:watch

# Specific package
pnpm test --testPathPattern=shared-components
```

### E2E Tests
```bash
# Run Playwright tests
pnpm test:e2e

# Interactive UI mode (recommended for development)
pnpm test:e2e:ui

# Debug mode
pnpm test:e2e --debug
```

### All Tests
```bash
pnpm test:all
```

## Linting & Type Checking

```bash
pnpm lint
```

## Adding a New Micro-Frontend

1. Create app directory:
```bash
mkdir apps/my-new-mfe
cd apps/my-new-mfe
```

2. Copy package.json from another MFE and update:
```json
{
  "name": "my-new-mfe",
  "scripts": {
    "dev": "next dev -p 3004"
  }
}
```

3. Create `next.config.js` with Module Federation:
```javascript
const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = NextFederationPlugin({
  name: 'my-new-mfe',
  filename: 'static/chunks/remoteEntry.js',
  exposes: {
    './root': './src/components/MyMFERoot.tsx',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.2.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
    '@mfe/shared-types': { singleton: true },
    '@mfe/shared-components': { singleton: true },
  },
});
```

4. Add to shell's `next.config.js` remotes:
```javascript
remotes: {
  'my-new-mfe': 'my-new-mfe@http://localhost:3004/mfe-manifest.json',
}
```

## Architecture Notes

### EventBus Usage

**From a MFE, emit an event:**
```typescript
import { useEventBus } from '@/EventBus';

export default function MyComponent() {
  const { emit } = useEventBus();

  const handleAction = () => {
    emit('ORDER_PLACED', {
      orderId: 'ORD-123',
      total: 299.99,
    }, 'my-mfe');
  };

  return <button onClick={handleAction}>Place Order</button>;
}
```

**Listen to events:**
```typescript
import { useEffect } from 'react';
import { useEventBus } from '@/EventBus';

export default function Dashboard() {
  const { on } = useEventBus();

  useEffect(() => {
    const unsubscribe = on('ORDER_PLACED', (event) => {
      console.log('New order:', event.payload);
    });

    return unsubscribe;
  }, []);

  return <div>Dashboard</div>;
}
```

### Adding Shared Components

Edit `packages/shared-components/src/index.ts`:
```typescript
export { MyNewComponent } from './MyNewComponent';
export type { MyNewComponentProps } from './MyNewComponent';
```

### Adding Shared Types

Edit `packages/shared-types/src/events.ts` and export new types.

## Debugging

### VS Code Debugging
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "attach",
      "name": "Attach Chrome",
      "port": 9222,
      "pathMapping": {
        "/": "${workspaceRoot}/",
        "/apps/shell": "${workspaceRoot}/apps/shell"
      }
    }
  ]
}
```

Run shell with debugging:
```bash
cd apps/shell && pnpm dev -- --inspect-brk
```

### Module Federation Inspector
Check what remotes are loaded by inspecting Network tab in DevTools.

## Deployment

### Docker Build
```bash
docker build -t mfe-showcase .
```

### Environment Variables
Create `.env.local` for local overrides:
```
NEXT_PUBLIC_DASHBOARD_URL=https://dashboard.prod.example.com
NEXT_PUBLIC_CHECKOUT_URL=https://checkout.prod.example.com
NEXT_PUBLIC_SETTINGS_URL=https://settings.prod.example.com
```

Update `next.config.js` remotes to use env vars:
```javascript
remotes: {
  dashboard: `dashboard@${process.env.NEXT_PUBLIC_DASHBOARD_URL}/mfe-manifest.json`,
}
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on specific port (e.g., 3000)
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### Module Federation Issues
- Clear Next.js cache: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && pnpm install`

### Type Errors
```bash
# Rebuild shared packages
pnpm run build --filter=@mfe/shared-*
```

## CI/CD

GitHub Actions workflows run on push/PR to main:
- Lint check
- Type check
- Build all apps
- Run unit tests
- Run E2E tests

View status: GitHub Actions tab in repo

## Performance

### Bundle Analysis
```bash
ANALYZE=true pnpm build
```

### Lighthouse
```bash
pnpm test:e2e -- --headed
# Then manually run Lighthouse in DevTools
```

## Contributing

1. Create feature branch
2. Make changes
3. Run `pnpm test:all`
4. Commit with meaningful message
5. Push and create PR

---

**Questions?** Check README.md for architecture details or create an issue.
