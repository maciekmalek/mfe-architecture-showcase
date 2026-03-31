import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ className = '', children, ...props }) => (
  <div
    className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);
