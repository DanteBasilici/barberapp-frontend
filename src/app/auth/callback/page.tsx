"use client";

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      Cookies.set('access_token', token, {
        expires: 1, // La cookie expira en 1 día
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
      router.push('/dashboard');
    } else {
      router.push('/auth/login?error=NoToken');
    }
  }, [searchParams, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <p className="text-foreground animate-pulse">Autenticando...</p>
    </div>
  );
}