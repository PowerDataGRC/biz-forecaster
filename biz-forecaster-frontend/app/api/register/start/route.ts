import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, companyName, firstName, lastName } = body;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/registration/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, companyName, firstName, lastName }),
    });

    const data = await response.json();

    // If there's an error, pass through the status and error details
    if (!response.ok) {
      console.error('Backend registration error:', {
        status: response.status,
        data
      });
      
      return NextResponse.json(data, { 
        status: response.status 
      });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Registration route error:', error);
    
    // Check if it's a known error type
    if (error.code === 'EMAIL_EXISTS' || error.code?.startsWith('auth/')) {
      return NextResponse.json({
        message: error.message || 'Email already in use',
        code: error.code,
        details: error.details
      }, { 
        status: 409 
      });
    }

    return NextResponse.json({
      message: 'Registration failed',
      code: 'INTERNAL_ERROR',
      details: {
        suggestion: 'Please try again later or contact support if the problem persists.'
      }
    }, { 
      status: 500 
    });
  }
}