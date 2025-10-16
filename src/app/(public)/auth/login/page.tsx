export default function LoginPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const googleLoginUrl = `${apiUrl}/auth/google`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
          Bienvenido a <span className="text-primary">BarberApp</span>
        </h1>
        <p className="mt-4 text-foreground/80 max-w-md">
          Usa tu cuenta de Google para acceder a tu dashboard y llevar tu barbería al siguiente nivel.
        </p>
        <a
          href={googleLoginUrl}
          className="mt-10 inline-block bg-primary text-secondary font-bold text-lg px-8 py-4 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 card-neon-hover"
        >
          Iniciar Sesión con Google
        </a>
      </div>
    </main>
  );
}