"use client"; // Mantenemos esto para el componente interno

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

// Este es el componente que realmente hace el trabajo.
// Como usa useSearchParams, debe ser renderizado en el cliente.
function CallbackClientComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      Cookies.set('access_token', token, {
        expires: 1,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
      // Usamos replace en lugar de push para que el usuario no pueda volver atrás
      router.replace('/dashboard');
    } else {
      router.replace('/auth/login?error=NoToken');
    }
  }, [searchParams, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <p className="text-foreground animate-pulse">Autenticando...</p>
    </div>
  );
}


// Este es el componente de página principal.
// Envolvemos nuestro componente cliente en <Suspense>.
export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <CallbackClientComponent />
    </Suspense>
  );
}