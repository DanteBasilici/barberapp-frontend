import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-secondary">Inicia Sesión</h1>
      <p className="mt-4 text-foreground/80">
        Usa tu cuenta de Google para acceder a tu dashboard.
      </p>
      <a
        href="http://localhost:3001/auth/google"
        className="mt-8 bg-primary text-secondary font-bold text-lg px-8 py-4 rounded-lg hover:scale-105 transition-transform shadow-lg shadow-primary/20"
      >
        Login con Google
      </a>
    </main>
  );
}