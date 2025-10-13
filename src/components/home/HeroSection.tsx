import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center h-screen text-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src="/barber-video.mp4"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 -z-10" />
      <div className="z-10 flex flex-col items-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-foreground leading-tight">
          La gestión de tu barbería,
          <br />
          <span className="text-primary">tan perfecta como tus cortes.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-2xl text-foreground/80">
          Enfócate en tu arte. Nosotros nos encargamos del resto.
        </p>
         <Link
             href="/register"
             className="mt-10 bg-primary text-secondary font-bold text-lg px-8 py-4 rounded-lg hover:scale-105 transition-transform shadow-lg shadow-primary/20"
            >
            Empieza Ahora
        </Link>
      </div>
    </section>
  );
}