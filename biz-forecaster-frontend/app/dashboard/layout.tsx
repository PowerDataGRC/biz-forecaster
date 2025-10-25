'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [router]);

  if (!user) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}
