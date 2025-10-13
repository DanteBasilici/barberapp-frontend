import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const cookieStore = cookies();
  const token = cookieStore.get('access_token');

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const path = params.path.join('/');
  const backendUrl = `http://localhost:3001/auth/${path}`;

  try {
    const backendResponse = await fetch(backendUrl, {
      headers: {
        'Cookie': `access_token=${token.value}`,
      },
    });

    if (backendResponse.status === 204) {
      return new NextResponse(null, { status: 204 });
    }
    
    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(data, { status: backendResponse.status });
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Error connecting to backend:', error);
    return NextResponse.json({ error: 'Error connecting to backend' }, { status: 500 });
  }
}