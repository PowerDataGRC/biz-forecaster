import React from 'react';
import './globals.css'; // Assuming you have a global stylesheet
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata = {
  title: 'BizForecaster',
  description: 'Your Business Forecasting Solution',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
