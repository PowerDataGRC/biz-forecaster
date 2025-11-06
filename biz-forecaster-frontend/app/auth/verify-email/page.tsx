 'use client';

 import { useEffect, useState, Suspense } from 'react';
 import { useSearchParams } from 'next/navigation';

 type StatusType = 'loading' | 'success' | 'error';

 interface StatusProps {
   status: StatusType;
   message: string;
 }

 // Small presentational component for status
 const VerificationStatus = ({ status, message }: StatusProps) => {
   const statusStyles = {
     loading: 'text-gray-600',
     success: 'text-green-600',
     error: 'text-red-600',
   } as const;

   return (
     <div className={`p-4 rounded-md text-center ${statusStyles[status]}`}>
       <p className="text-lg font-semibold">{message}</p>
     </div>
   );
 };

 // Client component that reads token from the URL and calls backend to complete registration
 function EmailVerifier() {
   const searchParams = useSearchParams();
   const token = searchParams?.get('token');
   const [status, setStatus] = useState<StatusType>('loading');
   const [message, setMessage] = useState('Verifying your email, please wait...');

   useEffect(() => {
     const verify = async () => {
       if (!token) {
         setStatus('error');
         setMessage('Verification token not found. Please check the link and try again.');
         return;
       }

       try {
         const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
         const res = await fetch(`${apiBase}/registration/complete`, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ token }),
         });

         const data = await res.json();
         if (!res.ok) throw new Error(data.message || 'Verification failed');

         setStatus('success');
         setMessage(data.message || 'Your email has been verified. You can now log in.');
       } catch (err: any) {
         setStatus('error');
         setMessage(err?.message || 'An unexpected error occurred.');
       }
     };

     verify();
   }, [token]);

   return <VerificationStatus status={status} message={message} />;
 }

 // Page wrapper (single default export)
 export default function VerifyEmailPage() {
   return (
     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
       <div className="max-w-md w-full space-y-8">
         <div className="text-center">
           <h2 className="text-3xl font-extrabold text-gray-900">Email Verification</h2>
           <p className="mt-2 text-sm text-gray-600">Please wait while we verify your email...</p>
         </div>
         <Suspense
           fallback={<VerificationStatus status="loading" message="Loading verification..." />}
         >
           <EmailVerifier />
         </Suspense>
       </div>
     </div>
   );
 }

