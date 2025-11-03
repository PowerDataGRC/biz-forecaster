import { Suspense } from 'react';
import VerificationComponent from './VerificationComponent';

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <Suspense fallback={<Loading />}>
        <VerificationComponent />
      </Suspense>
    </div>
  );
}

function Loading() {
  return <h2 className="text-2xl font-bold">Loading verification...</h2>;
}