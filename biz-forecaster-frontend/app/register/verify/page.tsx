import { Suspense } from 'react';
import VerificationComponent from './VerificationComponent';

export default function VerifyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Suspense fallback={<div>Loading...</div>}>
        <VerificationComponent />
      </Suspense>
    </div>
  );
}