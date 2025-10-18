import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND_URL = `${process.env.NEXT_PUBLIC_API_URL}/cuts`;

export async function GET(request: NextRequest) {
  const token = cookies().get('access_token');
  if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  try {
    const res = await fetch(BACKEND_URL, {
      headers: { 'Cookie': `access_token=${token.value}` },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: 'Error connecting to backend' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const token = cookies().get('access_token');
  if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const body = await request.json();

  try {
    const res = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cookie': `access_token=${token.value}` },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: 'Error connecting to backend' }, { status: 500 });
  }
}