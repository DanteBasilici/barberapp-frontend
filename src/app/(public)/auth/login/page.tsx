export default function LoginPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const googleLoginUrl = `${apiUrl}/auth/google`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
          Bienvenido a <span className="text-primary">BarberApp</span>
        </h1>
        <p className="mt-4 text-foreground/80 max-w-md">
          Usa tu cuenta de Google para acceder a tu dashboard y llevar tu barbería al siguiente nivel.
        </p>
        <a
          href={googleLoginUrl}
          className="mt-10 inline-flex items-center justify-center gap-3 bg-primary text-secondary font-bold text-lg px-8 py-4 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 card-neon-hover"
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 381.5 512 244 512 110.1 512 0 401.9 0 261.8 0 120.3 110.1 9.2 244 9.2c77.7 0 142 32.4 187.2 76.7L377.6 150.3C340.4 117.3 298.3 97.2 244 97.2c-109.5 0-199 89.6-199 199.3s89.5 199.3 199 199.3c121.7 0 168.8-97.4 175.2-149.8H244v-91.2h244z"
            ></path>
          </svg>
          <span>Iniciar Sesión con Google</span>
        </a>
      </div>
    </main>
  );
}