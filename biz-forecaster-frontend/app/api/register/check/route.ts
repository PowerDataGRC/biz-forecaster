import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    const response = await fetch(`${process.env.BACKEND_URL}/registration/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    return NextResponse.json({ available: true });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: 'Could not check email availability',
        code: 'CHECK_FAILED',
        details: {
          suggestion: 'Please try again later or contact support if the problem persists.'
        }
      },
      { status: 500 }
    );
  }
}