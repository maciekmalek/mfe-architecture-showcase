'use client';

import React, { useState } from 'react';
import { Button, Card } from '@mfe/shared-components';
import type { CartItem, PaymentMethod, CheckoutDetails } from '@mfe/shared-types';

const MOCK_CART: CartItem[] = [
  { id: '1', name: 'Laptop', price: 999.99, quantity: 1 },
  { id: '2', name: 'Mouse', price: 29.99, quantity: 2 },
  { id: '3', name: 'Keyboard', price: 149.99, quantity: 1 },
];

export default function CheckoutRoot() {
  const [step, setStep] = useState<'cart' | 'payment' | 'confirmation'>('cart');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod['type']>('card');
  const [orderCreated, setOrderCreated] = useState<string | null>(null);

  const subtotal = MOCK_CART.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleCheckout = () => {
    const orderId = `ORD-${Date.now()}`;
    setOrderCreated(orderId);
    setStep('confirmation');
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="mb-2 text-2xl font-bold">Checkout</h2>
        <p className="text-gray-600">
          Complete your purchase with multiple payment methods
        </p>
      </Card>

      {step === 'cart' && (
        <>
          <Card>
            <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
            <div className="space-y-3">
              {MOCK_CART.map((item) => (
                <div key={item.id} className="flex justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t pt-4">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Tax (10%)</p>
                <p>${tax.toFixed(2)}</p>
              </div>
              <div className="flex justify-between border-t pt-2 text-lg font-bold">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </div>
          </Card>

          <Button onClick={() => setStep('payment')} className="w-full py-3 text-lg">
            Proceed to Payment
          </Button>
        </>
      )}

      {step === 'payment' && (
        <>
          <Card>
            <h3 className="mb-4 text-lg font-semibold">Select Payment Method</h3>
            <div className="space-y-3">
              {(['card', 'cash', 'split'] as const).map((method) => (
                <label key={method} className="flex cursor-pointer items-center rounded border p-3 hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={selectedPayment === method}
                    onChange={(e) => setSelectedPayment(e.target.value as PaymentMethod['type'])}
                    className="mr-3"
                  />
                  <span className="font-medium capitalize">{method}</span>
                </label>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex justify-between text-lg font-bold">
              <p>Total Amount</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button
              onClick={() => setStep('cart')}
              variant="secondary"
              className="flex-1 py-3"
            >
              Back
            </Button>
            <Button
              onClick={handleCheckout}
              className="flex-1 py-3 text-lg"
            >
              Complete Purchase
            </Button>
          </div>
        </>
      )}

      {step === 'confirmation' && (
        <Card>
          <div className="text-center py-8">
            <div className="mb-4 text-5xl">✓</div>
            <h3 className="mb-2 text-2xl font-bold text-green-600">Order Confirmed!</h3>
            <p className="mb-4 text-gray-600">Your order has been placed successfully</p>
            <p className="mb-6 text-xl font-semibold">{orderCreated}</p>
            <Button onClick={() => setStep('cart')} className="w-full py-3">
              Continue Shopping
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
