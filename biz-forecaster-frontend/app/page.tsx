'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { useIsClient } from '../hooks/useIsClient';
import { getFirebaseErrorMessage } from '../lib/firebaseErrors';

export default function AuthPage() {
  const { user } = useAuth();
  const isClient = useIsClient();
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState<string | null>(null); // State to hold error messages
  const router = useRouter();


  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error signing in:', error);
      setError(getFirebaseErrorMessage(error));
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      // 1. Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, registerData.email, registerData.password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      // 2. Create the user in your own backend database
      const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Send the Firebase token for authentication
        },
        body: JSON.stringify({
          email: registerData.email,
          password: registerData.password,
          username: registerData.email, // Using email as username for now
        }),
      });

      if (!apiResponse.ok) {
        // If the API call fails, handle the error
        const errorData = await apiResponse.json();
        throw new Error(errorData.message || 'Failed to create user in backend.');
      }

      // 3. Redirect to the dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating user:', error);
      setError(getFirebaseErrorMessage(error));
    }
  };

  // This effect handles redirecting an already logged-in user.
  useEffect(() => {
    if (isClient && user) {
      router.push('/dashboard');
    }
  }, [user, isClient, router]);

  // Render a loading state or null on the server and initial client render to prevent hydration errors.
  if (!isClient || user) {
    return null; // Or a loading spinner component
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-800 px-4 py-5 sm:px-6">
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab('login')}
              className={`w-1/2 py-3 text-center text-sm font-medium ${activeTab === 'login' ? 'border-b-2 border-indigo-500 text-white' : 'text-gray-400 hover:text-white'}`}>
              Login
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`w-1/2 py-3 text-center text-sm font-medium ${activeTab === 'register' ? 'border-b-2 border-indigo-500 text-white' : 'text-gray-400 hover:text-white'}`}>
              Register
            </button>
          </div>
        </div>
        <div className="bg-gray-800 p-8">
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-white mb-6">Welcome Back!</h2>
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-300">Email address</label>
                <input id="login-email" name="email" type="email" autoComplete="email" required value={loginData.email} onChange={handleLoginChange} className="appearance-none block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white" />
              </div>
              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-300">Password</label>
                <input id="login-password" name="password" type="password" autoComplete="current-password" required value={loginData.password} onChange={handleLoginChange} className="appearance-none block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white" />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link href="#" className="font-medium text-indigo-400 hover:text-indigo-300">Forgot your password?</Link>
                </div>
              </div>
              {error && activeTab === 'login' && (
                <div className="text-red-400 text-sm text-center">
                  {error}
                </div>
              )}
              <div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign in</button>
              </div>
            </form>
          )}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-white mb-6">Create Your Account</h2>
              <div>
                <label htmlFor="register-email" className="block text-sm font-medium text-gray-300">Email address</label>
                <input id="register-email" name="email" type="email" autoComplete="email" required value={registerData.email} onChange={handleRegisterChange} className="appearance-none block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white" />
              </div>
              <div>
                <label htmlFor="register-password" className="block text-sm font-medium text-gray-300">Password</label>
                <input id="register-password" name="password" type="password" autoComplete="new-password" required value={registerData.password} onChange={handleRegisterChange} className="appearance-none block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white" />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm Password</label>
                <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required value={registerData.confirmPassword} onChange={handleRegisterChange} className="appearance-none block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white" />
              </div>
              {error && activeTab === 'register' && (
                <div className="text-red-400 text-sm text-center">
                  {error}
                </div>
              )}
              <div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign up</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
