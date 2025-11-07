import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = body;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/registration/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: 'Registration failed',
        code: 'INTERNAL_ERROR',
        details: {
          suggestion: 'Please try again later or contact support if the problem persists.'
        }
      },
      { status: 500 }
    );
  }
}