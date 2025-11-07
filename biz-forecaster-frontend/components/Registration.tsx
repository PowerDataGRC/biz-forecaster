'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePasswordValidation } from '../hooks/usePasswordValidation';

export function Registration() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordValidation = usePasswordValidation(password);

  const isFormValid =
    firstName.trim() !== '' &&
    lastName.trim() !== '' &&
    companyName.trim() !== '' &&
    email.trim() !== '' &&
    password.trim() !== '' &&
    password === confirmPassword &&
    passwordValidation.isValid &&
    emailAvailable === true;

  useEffect(() => {
    // Clear any previous errors when the component mounts
    setError(null);
  }, []);

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsCheckingEmail(true);
    setEmailAvailable(null);

    try {
      const res = await fetch('/api/register/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newEmail }),
      });
      if (res.ok) {
        setEmailAvailable(true);
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'This email is already taken.');
        setEmailAvailable(false);
      }
    } catch (err) {
      setError('Could not verify email.');
      setEmailAvailable(false);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isFormValid) {
      setError('Please correct the errors before submitting.');
      return;
    }

    const response = await fetch('/api/register/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, companyName, firstName, lastName }),
    });

    const data = await response.json();

    if (response.ok) {
      router.push('/register/success'); // Redirect to a success page
    } else {
      setError(data.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              id="companyName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {isCheckingEmail && <p className="text-sm text-gray-500">Checking...</p>}
            {emailAvailable === false && email.length > 0 && <p className="text-sm text-red-500">Email is already taken.</p>}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            {password && confirmPassword && password !== confirmPassword && (
              <p className="text-red-500 text-sm">Passwords do not match.</p>
            )}
          </div>

          <button type="submit" disabled={!isFormValid} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400">
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account? <Link href="/" className="font-medium text-indigo-600 hover:text-indigo-500">Log in</Link>
        </p>
      </div>
    </div>
  );
}