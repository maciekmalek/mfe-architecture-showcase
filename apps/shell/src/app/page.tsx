'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { Card, Button } from '@mfe/shared-components';
import { EventBusProvider } from './EventBus';

const Dashboard = React.lazy(() => import('dashboard/root'));
const Checkout = React.lazy(() => import('checkout/root'));
const Settings = React.lazy(() => import('settings/root'));

export default function Home() {
  const [activeTab, setActiveTab] = React.useState<'home' | 'dashboard' | 'checkout' | 'settings'>('home');

  return (
    <EventBusProvider>
      <div className="min-h-screen bg-gray-50">
        <nav className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-8">
                <h1 className="text-xl font-bold">MFE Architecture</h1>
                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveTab('home')}
                    className={`px-3 py-2 text-sm font-medium ${
                      activeTab === 'home'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Home
                  </button>
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`px-3 py-2 text-sm font-medium ${
                      activeTab === 'dashboard'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setActiveTab('checkout')}
                    className={`px-3 py-2 text-sm font-medium ${
                      activeTab === 'checkout'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Checkout
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`px-3 py-2 text-sm font-medium ${
                      activeTab === 'settings'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {activeTab === 'home' && (
            <div className="space-y-8">
              <Card>
                <h2 className="mb-4 text-2xl font-bold">Welcome to MFE Architecture Showcase</h2>
                <p className="mb-4 text-gray-600">
                  This is a production-ready implementation of micro-frontend architecture using Next.js Module Federation.
                </p>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Key Features:</h3>
                  <ul className="list-inside list-disc space-y-2 text-gray-600">
                    <li>Module Federation for independent micro-frontends</li>
                    <li>Event orchestration between MFEs</li>
                    <li>Shared types and components</li>
                    <li>E2E testing with Playwright</li>
                  </ul>
                </div>
              </Card>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card>
                  <h3 className="mb-2 text-lg font-semibold">Dashboard</h3>
                  <p className="mb-4 text-gray-600">View stats and analytics from your dashboard</p>
                  <Button onClick={() => setActiveTab('dashboard')}>Go to Dashboard</Button>
                </Card>
                <Card>
                  <h3 className="mb-2 text-lg font-semibold">Checkout</h3>
                  <p className="mb-4 text-gray-600">Complete your order with multiple payment options</p>
                  <Button onClick={() => setActiveTab('checkout')}>Go to Checkout</Button>
                </Card>
                <Card>
                  <h3 className="mb-2 text-lg font-semibold">Settings</h3>
                  <p className="mb-4 text-gray-600">Customize your preferences and theme</p>
                  <Button onClick={() => setActiveTab('settings')}>Go to Settings</Button>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <Suspense fallback={<div className="text-center">Loading Dashboard...</div>}>
              <Dashboard />
            </Suspense>
          )}

          {activeTab === 'checkout' && (
            <Suspense fallback={<div className="text-center">Loading Checkout...</div>}>
              <Checkout />
            </Suspense>
          )}

          {activeTab === 'settings' && (
            <Suspense fallback={<div className="text-center">Loading Settings...</div>}>
              <Settings />
            </Suspense>
          )}
        </main>
      </div>
    </EventBusProvider>
  );
}
