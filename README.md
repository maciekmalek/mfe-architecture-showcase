# Micro-Frontend Architecture Showcase

Production-ready implementation of a micro-frontend system using **Next.js Module Federation**, demonstrating enterprise-grade scalability, independent deployment, and event orchestration.

## 🏗️ Architecture Overview

This is a **monorepo** containing a shell application (host) that dynamically loads three independent micro-frontends (remotes). Each MFE is a fully autonomous Next.js application that can be developed and deployed independently.

```
┌─────────────────────────────────────────────────┐
│              Shell (Host) - Port 3000            │
│  ┌──────────────────────────────────────────┐   │
│  │          EventBus Orchestration          │   │
│  │                                          │   │
│  │  Dashboard  │  Checkout  │  Settings    │   │
│  │  (Remote)   │  (Remote)  │  (Remote)    │   │
│  │ Port 3001   │ Port 3002  │ Port 3003    │   │
│  └──────────────────────────────────────────┘   │
│                                                 │
│  Shared: Types, Components, Utilities           │
└─────────────────────────────────────────────────┘
```

## 🎯 Key Features

### 1. **Module Federation**
- Remotes are loaded dynamically from the shell application
- Shared dependencies (React, TypeScript, Tailwind CSS)
- Independent versioning and deployment
- Zero impact on other MFEs when one is deployed

### 2. **EventBus Orchestration**
- React Context-based event system
- Type-safe event communication between MFEs
- `useEventBus()` hook for subscribing/emitting events
- Example flow: Checkout MFE publishes `ORDER_PLACED` → Dashboard listens

### 3. **Shared Packages**
- **`@mfe/shared-types`**: Centralized TypeScript types for events and domain models
- **`@mfe/shared-components`**: Reusable Button, Card, etc. (Tailwind styled)
- Ensures consistency across all micro-frontends

### 4. **Monorepo Structure**
- Managed with **pnpm workspaces**
- **Nx** for task orchestration
- Single dependency tree with workspace references
- Fast local development

## 📁 Project Structure

```
.
├── apps/
│   ├── shell/              # Host application (port 3000)
│   │   ├── src/
│   │   │   ├── EventBus.tsx          # Context for event orchestration
│   │   │   └── app/
│   │   │       └── page.tsx          # Main page with tab navigation
│   │   └── next.config.js            # Module Federation config
│   ├── dashboard/          # Remote MFE (port 3001)
│   │   ├── src/components/
│   │   │   └── DashboardRoot.tsx
│   │   └── next.config.js
│   ├── checkout/           # Remote MFE (port 3002)
│   │   ├── src/components/
│   │   │   └── CheckoutRoot.tsx
│   │   └── next.config.js
│   └── settings/           # Remote MFE (port 3003)
│       ├── src/components/
│       │   └── SettingsRoot.tsx
│       └── next.config.js
├── packages/
│   ├── shared-types/       # TypeScript event and domain types
│   │   └── src/events.ts
│   └── shared-components/  # Shared UI components (Tailwind)
│       ├── src/Button.tsx
│       └── src/Card.tsx
├── nx.json                 # Nx configuration
├── pnpm-workspace.yaml     # pnpm workspace definition
└── tsconfig.json           # Root TypeScript config
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm 8+

### Install Dependencies
```bash
pnpm install
```

### Development
Start all applications in development mode:

```bash
# Terminal 1: Shell (Host)
cd apps/shell && pnpm dev         # http://localhost:3000

# Terminal 2: Dashboard Remote
cd apps/dashboard && pnpm dev     # http://localhost:3001

# Terminal 3: Checkout Remote
cd apps/checkout && pnpm dev      # http://localhost:3002

# Terminal 4: Settings Remote
cd apps/settings && pnpm dev      # http://localhost:3003
```

Then open **http://localhost:3000** in your browser and navigate between tabs.

### Build for Production
```bash
pnpm build
```

## 🔄 Event Orchestration Example

### Using the EventBus

**Emitting an event** (from Checkout MFE):
```typescript
const { emit } = useEventBus();

emit('ORDER_PLACED', {
  orderId: 'ORD-123',
  total: 299.99,
  items: [...],
}, 'checkout');
```

**Listening to events** (from Dashboard MFE):
```typescript
const { on } = useEventBus();

useEffect(() => {
  const unsubscribe = on('ORDER_PLACED', (event) => {
    console.log('Order received:', event.payload);
    // Update dashboard stats
  });

  return unsubscribe;
}, []);
```

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14+ (App Router) |
| **Monorepo** | Nx + pnpm workspaces |
| **Module Federation** | @module-federation/nextjs-mf |
| **Language** | TypeScript 5.0+ |
| **Styling** | Tailwind CSS 3+ |
| **Forms** | React Hook Form |
| **Validation** | Zod |
| **Testing** | Jest + Playwright |

## 📦 Module Federation Configuration

Each application's `next.config.js` defines:

**Shell (Host):**
```javascript
remotes: {
  dashboard: 'dashboard@http://localhost:3001/mfe-manifest.json',
  checkout: 'checkout@http://localhost:3002/mfe-manifest.json',
  settings: 'settings@http://localhost:3003/mfe-manifest.json',
}
```

**Remote (e.g., Dashboard):**
```javascript
exposes: {
  './root': './src/components/DashboardRoot.tsx',
}
```

## 🧪 Testing

### Unit Tests
```bash
pnpm test
```

### E2E Tests
```bash
pnpm test:e2e
```

## 🌐 Deployment Strategy

### Independent Deployment
Each remote can be deployed separately:

1. **Dashboard** deploys to `dashboard.example.com`
2. **Checkout** deploys to `checkout.example.com`
3. **Settings** deploys to `settings.example.com`
4. **Shell** dynamically references the remote URLs

### CI/CD
GitHub Actions workflows (included) handle:
- Linting & type checking
- Unit tests
- E2E tests
- Artifact generation

## 🎓 Architecture Decision Records (ADRs)

### ADR 1: Why Module Federation?
- **Problem**: Need for independent team velocity and deployment
- **Solution**: Module Federation allows runtime-composed remotes
- **Benefit**: Teams work autonomously with zero coupling at build time

### ADR 2: EventBus for Inter-MFE Communication
- **Problem**: MFEs need to communicate state changes
- **Solution**: Context-based EventBus with pub/sub pattern
- **Benefit**: Loose coupling, no direct component imports between MFEs

### ADR 3: Shared Packages for Types & Components
- **Problem**: Type mismatches and UI inconsistency across MFEs
- **Solution**: Monorepo with centralized type definitions and components
- **Benefit**: Single source of truth, compile-time type safety

## 🚨 Known Limitations

- Module Federation requires CORS setup for cross-origin deployments
- Shared dependencies must have compatible versions
- State synchronization relies on EventBus (consider Redux/Zustand for complex state)

## 📚 Learning Resources

- [Module Federation Documentation](https://webpack.js.org/concepts/module-federation/)
- [Next.js Module Federation Plugin](https://github.com/module-federation/nextjs-mf)
- [Micro-frontend Patterns](https://micro-frontends.org/)

## 🤝 Contributing

This is a showcase repository. Feel free to fork and adapt for your needs.

## 📄 License

MIT

---

**Built with ❤️ to showcase production-ready micro-frontend architecture**
