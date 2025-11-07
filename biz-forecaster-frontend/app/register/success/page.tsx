import Link from 'next/link';

export default function RegistrationSuccessPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Registration Submitted!</h1>
        <p className="mb-6">
          A verification link has been sent to your email address. Please check your inbox (and spam folder) to complete your registration.
        </p>
        <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Return to Home
        </Link>
      </div>
    </div>
  );
}