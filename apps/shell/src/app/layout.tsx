import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MFE Architecture Showcase',
  description: 'Production-ready micro-frontend architecture with Module Federation',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
