'use client';

import { useState } from 'react';
import QRCode from 'qrcode';
import Image from 'next/image';

export default function OtpSetup() {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEnable2FA = async () => {
    setError('');
    setSuccess('');
    try {
      // TODO: Replace with your actual NestJS backend URL, possibly from an environment variable.
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/api/auth/otp/generate`);
      if (!response.ok) {
        throw new Error('Failed to generate OTP secret.');
      }
      const data = await response.json();
      const dataUrl = await QRCode.toDataURL(data.uri);
      setQrCodeDataUrl(dataUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    }
  };

  const handleVerify = async () => {
    setError('');
    setSuccess('');
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_UR || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/api/auth/otp/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include Authorization header if user is logged in
          // 'Authorization': `Bearer ${your_auth_token}`
        },
        body: JSON.stringify({ token: verificationCode }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Verification failed.');
      }
      setSuccess('Successfully enabled Two-Factor Authentication!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    }
  };

  return (
    <div>
      {!qrCodeDataUrl ? (
        <button
          onClick={handleEnable2FA}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Enable 2FA
        </button>
      ) : (
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div>
            <p className="text-white mb-4">Scan this QR code with your authenticator app:</p>
            <Image src={qrCodeDataUrl} alt="QR Code" width={200} height={200} className="rounded-lg" />
          </div>
          <div className="flex-grow">
            <p className="text-white mb-4">Then, enter the 6-digit code from your app to verify.</p>
            <input
              type="text"
              maxLength={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="bg-gray-800 text-white w-full px-4 py-2 rounded-lg mb-4 text-center text-2xl tracking-widest"
              placeholder="123456"
            />
            <button
              onClick={handleVerify}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-full transition-colors"
            >
              Verify & Complete Setup
            </button>
          </div>
        </div>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
}
