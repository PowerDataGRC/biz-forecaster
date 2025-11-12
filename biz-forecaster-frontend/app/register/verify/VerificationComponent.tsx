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
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/registration/complete`;
        if (!process.env.NEXT_PUBLIC_API_URL) {
          console.error('NEXT_PUBLIC_API_URL is not configured');
          throw new Error('Application configuration error');
        }

        console.log('Starting verification:', {
          apiUrl,
          tokenLength: token?.length,
          tokenStart: token?.substring(0, 10) + '...'
        });

        console.log('Making verification request to:', apiUrl);
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ token }),
          credentials: 'include'
        });

        console.log('Response details:', {
          status: response.status,
          statusText: response.statusText,
          contentType: response.headers.get('content-type'),
          headers: Object.fromEntries(response.headers.entries())
        });

        const responseText = await response.text();
        console.log('Raw response:', responseText);

        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Failed to parse JSON:', parseError);
          throw new Error('Server returned invalid JSON. Please contact support.');
        }

        if (!response.ok) {
          throw new Error(data.message || 'An unknown error occurred.');
        }

        setStatus('Verification successful! Redirecting you to login...');
        setTimeout(() => {
          router.push('/'); // Redirect to the main login page
        }, 3000);

      } catch (err: unknown) {
        console.error('Verification error:', {
          message: err instanceof Error ? err.message : 'An unexpected error occurred.'
        });

        setStatus('Verification failed.');
        const errorMessage = err instanceof Error ? err.message : 'Could not complete registration. Please try again.';
        if (errorMessage.includes('Invalid token') || errorMessage.includes('expired')) {
          setError('Your verification link has expired. Please request a new one.');
        } else if (errorMessage.includes('already registered')) {
          setError('This account is already registered. Please try logging in.');
        } else {
          setError(errorMessage);
        }
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