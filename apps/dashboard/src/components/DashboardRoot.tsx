'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@mfe/shared-components';
import type { Order } from '@mfe/shared-types';

export default function DashboardRoot() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      status: 'completed',
      total: 299.99,
      items: [
        { id: '1', name: 'Product A', price: 99.99, quantity: 1 },
        { id: '2', name: 'Product B', price: 100.0, quantity: 2 },
      ],
      createdAt: new Date(Date.now() - 86400000),
    },
    {
      id: 'ORD-002',
      status: 'pending',
      total: 149.99,
      items: [{ id: '3', name: 'Product C', price: 149.99, quantity: 1 }],
      createdAt: new Date(),
    },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="mb-4 text-2xl font-bold">Dashboard</h2>
        <p className="text-gray-600">
          This is the Dashboard micro-frontend. It listens for ORDER_PLACED events from the Checkout MFE.
        </p>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">Total Orders</p>
            <p className="mt-2 text-3xl font-bold">{orders.length}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">Completed</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {orders.filter((o) => o.status === 'completed').length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            <p className="mt-2 text-3xl font-bold">
              ${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
            </p>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="mb-4 text-lg font-semibold">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Order ID</th>
                <th className="px-4 py-2 text-left font-medium">Status</th>
                <th className="px-4 py-2 text-left font-medium">Total</th>
                <th className="px-4 py-2 text-left font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100">
                  <td className="px-4 py-3">{order.id}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                        order.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-3">{order.createdAt.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
