'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface RegistrationError {
  message: string;
  code?: string;
  details?: any;
}

export const Registration = () => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<RegistrationError | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError({ message: 'Passwords do not match' });
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      setError({ message: 'Application configuration error: API URL not set' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/registration/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, email, password }),
      });

      const data = await res.json().catch(() => ({ message: 'Invalid response from server' }));

      if (!res.ok) {
        if (res.status === 409 || data.code === 'EMAIL_EXISTS') {
          setError({ message: 'This email address is already registered. Please try logging in instead.' });
        } else {
          setError({ message: data.message || 'Failed to start registration.' });
        }
        return;
      }

      setMessage('Registration initiated. Please check your email for a verification link.');
      // Optionally navigate to a confirmation page
      // router.push('/register/confirmation');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError({ message: err.message || 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">Create Your Account</h2>
      <form onSubmit={handleRegistration} className="space-y-6">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-300">Company Name</label>
          <input id="companyName" name="companyName" type="text" required value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="appearance-none block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white" />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email address</label>
          <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white" />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
          <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white" />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm Password</label>
          <input id="confirmPassword" name="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="appearance-none block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white" />
        </div>

        {error && (
          <div className="relative rounded-md bg-red-900/20 p-4 text-sm text-red-400">
            <div className="flex">
              <div className="flex-shrink-0">
                <p>{error.message}</p>
              </div>
            </div>
          </div>
        )}

        {message && (
          <div className="text-green-400 text-sm text-center">{message}</div>
        )}

        <div>
          <button type="submit" disabled={loading} className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {loading ? 'Registering...' : 'Sign up'}
          </button>
        </div>
      </form>
    </div>
  );
};