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
  } catch (error: unknown) {
    console.error('Registration route error:', error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return NextResponse.json(
      {
        message: 'Registration failed: ' + message,
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    );
  }
}