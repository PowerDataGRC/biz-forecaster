'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function VerificationContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const code = searchParams.get('code');
  const tenantId = searchParams.get('tenantId');

  const getErrorMessage = () => {
    switch (code) {
      case 'invalid_token':
        return {
          title: 'Verification Link Expired',
          message: 'This verification link is either invalid or has expired. Please try registering again.',
          link: '/register',
          linkText: 'Go to Registration',
        };
      case 'already_verified':
        return {
          title: 'Account Already Verified',
          message: 'This account has already been verified. You can now log in.',
          link: '/login',
          linkText: 'Go to Login',
        };
      default:
        return {
          title: 'Verification Failed',
          message: 'An unexpected error occurred during verification. Please try again or contact support.',
          link: '/register',
          linkText: 'Go to Registration',
        };
    }
  };

  if (status === 'success' && tenantId) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Verification Successful!</h1>
        <p className="mb-6">Your account has been successfully verified. You can now log in to your new organization.</p>
        <Link href={`/?tenantId=${tenantId}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to Login
        </Link>
      </div>
    );
  }

  const { title, message, link, linkText } = getErrorMessage();
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">{title}</h1>
      <p className="mb-6">{message}</p>
      <Link href={link} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
        {linkText}
      </Link>
    </div>
  );
}

export default function VerificationPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg max-w-md w-full">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <VerificationContent />
        </Suspense>
      </div>
    </div>
  );
}
