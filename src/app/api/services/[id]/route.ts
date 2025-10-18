import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const token = cookies().get('access_token');
  if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const body = await request.json();
  
  try {
    const res = await fetch(`${API_URL}/services/${params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Cookie': `access_token=${token.value}` },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: 'Error connecting to backend' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const token = cookies().get('access_token');
  if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  
  try {
    const res = await fetch(`${API_URL}/services/${params.id}`, {
      method: 'DELETE',
      headers: { 'Cookie': `access_token=${token.value}` },
    });
    return new NextResponse(null, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: 'Error connecting to backend' }, { status: 500 });
  }
}