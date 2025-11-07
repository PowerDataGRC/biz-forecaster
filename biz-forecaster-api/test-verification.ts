import fetch from 'node-fetch';

const API_BASE_URL = 'http://localhost:3001';

async function runVerificationTest() {
  console.log('--- Starting Backend Verification Test ---');

  // Use a unique email for each run to avoid conflicts
  const uniqueEmail = `testuser_${Date.now()}@example.com`;
  const testPayload = {
    email: uniqueEmail,
    password: 'password123',
    companyName: 'Test Co Inc',
  };

  let verificationToken = '';

  // --- Step 1: Start Registration and Get Token ---
  try {
    console.log('\n[Step 1] Calling /registration/start...');
    console.log('Request Payload:', JSON.stringify(testPayload, null, 2));

    const startResponse = await fetch(`${API_BASE_URL}/registration/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPayload),
    });

    const startData = await startResponse.json();

    if (!startResponse.ok || !startData.token) {
      console.error('Error starting registration:', startData);
      throw new Error(`Failed to start registration. Status: ${startResponse.status}`);
    }

    verificationToken = startData.token;
    console.log('✅ [Step 1] Success! Received verification token.');
    console.log('Token (truncated):', `${verificationToken.substring(0, 20)}...`);
  } catch (error) {
    console.error('❌ [Step 1] Failed:', error);
    return; // Stop the test if this step fails
  }

  // --- Step 2: Complete Registration with Token ---
  try {
    console.log('\n[Step 2] Calling /registration/complete...');
    const completePayload = { token: verificationToken };
    console.log('Request Payload:', JSON.stringify(completePayload, null, 2));

    const completeResponse = await fetch(`${API_BASE_URL}/registration/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(completePayload),
    });

    const completeData = await completeResponse.json();

    if (!completeResponse.ok) {
      console.error('Error completing registration:', completeData);
      throw new Error(`Failed to complete registration. Status: ${completeResponse.status}`);
    }

    console.log('✅ [Step 2] Success! Registration completed.');
    console.log('Response:', JSON.stringify(completeData, null, 2));
  } catch (error) {
    console.error('❌ [Step 2] Failed:', error);
    return;
  }

  console.log('\n--- Test Finished Successfully ---');
}

runVerificationTest();