'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function VerificationComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState('Verifying your account...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('Verification failed.');
      setError('No verification token found. Please try signing up again.');
      return;
    }

    const completeRegistration = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/registration/complete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'An unknown error occurred.');
        }

        setStatus('Verification successful! Redirecting you to login...');
        setTimeout(() => {
          router.push('/'); // Redirect to the main login page
        }, 3000);

      } catch (err: any) {
        setStatus('Verification failed.');
        setError(err.message || 'Could not complete registration.');
      }
    };

    completeRegistration();
  }, [searchParams, router]);

  return (
    <div className="max-w-md w-full text-center p-8 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">{status}</h1>
      {error && <p className="text-red-400">{error}</p>}
      {status.includes('successful') && <p>You can now log in with the credentials you provided.</p>}
      {error && <Link href="/" className="mt-4 inline-block text-indigo-400 hover:text-indigo-300">Return to Home</Link>}
    </div>
  );
}