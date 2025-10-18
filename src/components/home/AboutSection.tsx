export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background/95 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-video w-full rounded-lg overflow-hidden border border-border">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              src="/intro.mp4"
            />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Hecho por y para <span className="text-primary">Barberos</span>.
            </h2>
            <p className="mt-6 text-foreground/80 text-lg">
              No somos una empresa de software más. Somos gente de la industria, como tú. BarberApp nació de la necesidad real, en el día a día de una barbería, buscando una herramienta que fuera simple, directa y que realmente ayudara, sin complicaciones innecesarias.
            </p>
            <p className="mt-4 text-foreground/80 text-lg">
              Nuestra misión es darte la paz mental para que te concentres en lo que amas: el arte de la barbería.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}