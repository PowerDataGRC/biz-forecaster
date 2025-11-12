import { MainLayout } from '@/components/layout/MainLayout';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This MainLayout component now wraps all pages within the /dashboard directory,
  // providing the consistent sidebar and header.
  return <MainLayout>{children}</MainLayout>;
}