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
  const [showMultiLocation, setShowMultiLocation] = useState(false);
  const [locations, setLocations] = useState<string[]>([]);
  const [currentLocation, setCurrentLocation] = useState('');

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
    emailAvailable === true &&
    // If multi-location is checked, ensure at least one location has been added.
    (!showMultiLocation || (showMultiLocation && locations.length > 0));

  useEffect(() => {
    // Clear any previous errors when the component mounts
    setError(null);
  }, []);

  useEffect(() => {
    // Debounce the email check
    const handler = setTimeout(async () => {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        // Don't check if the email is empty or not a valid format
        setEmailAvailable(null);
        return;
      }

      setIsCheckingEmail(true);
      setEmailAvailable(null);

      try {
        const res = await fetch('/api/registration/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
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
    }, 500); // Wait for 500ms after the user stops typing

    return () => {
      clearTimeout(handler);
    };
  }, [email]);

  const handleAddLocation = () => {
    if (currentLocation.trim()) {
      setLocations([...locations, currentLocation.trim()]);
      setCurrentLocation('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Explicitly check the location requirement before submitting
    if (showMultiLocation && locations.length === 0) {
      setError('Please add at least one location, or uncheck the multi-location option.');
      return;
    }

    if (!isFormValid) {
      setError('Please correct the errors before submitting.');
      return;
    }

    // If multi-location is not enabled, send a default location. Otherwise, send the list.
    const locationsToSend = showMultiLocation ? locations : ['Default'];

    const response = await fetch('/api/registration/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, companyName, firstName, lastName, locations: locationsToSend }),
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
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}

          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
            <input
              type="text"
              id="firstName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Company Name</label>
            <input
              type="text"
              id="companyName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {isCheckingEmail && <p className="text-sm text-gray-500 dark:text-gray-400">Checking...</p>}
            {emailAvailable === false && email.length > 0 && <p className="text-sm text-red-500 dark:text-red-400">Email is already taken.</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            {password && confirmPassword && password !== confirmPassword && (
              <p className="text-red-500 dark:text-red-400 text-sm">Passwords do not match.</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <input
                id="multi-location-checkbox"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded"
                checked={showMultiLocation}
                onChange={(e) => setShowMultiLocation(e.target.checked)}
              />
              <label htmlFor="multi-location-checkbox" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                My business has multiple locations
              </label>
            </div>

            {showMultiLocation && (
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                <label htmlFor="locationName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location Name</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="locationName"
                    className="flex-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                    placeholder="e.g., Downtown Branch"
                  />
                  <button type="button" onClick={handleAddLocation} className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-r-md hover:bg-gray-100 dark:hover:bg-gray-500">Add</button>
                </div>
                <ul className="mt-2 list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                  {locations.map((loc, index) => <li key={index}>{loc}</li>)}
                </ul>
              </div>
            )}
          </div>

          <button type="submit" disabled={!isFormValid} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400">
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account? <Link href="/" className="font-medium text-indigo-600 hover:text-indigo-500 dark:hover:text-indigo-400">Log in</Link>
        </p>
      </div>
    </div>
  );
}