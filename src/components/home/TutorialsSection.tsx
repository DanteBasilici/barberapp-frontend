const tutorials = [
  {
    title: "Registra un Corte en 30s",
    description: "Desde que entra el cliente hasta que pagas, todo en segundos.",
    videoSrc: "https://videos.pexels.com/video-files/3254013/3254013-hd_1920_1080_30fps.mp4" 
  },
  {
    title: "Invita a tu Equipo con un Click",
    description: "Añade a tus barberos y empieza a colaborar al instante.",
    videoSrc: "https://videos.pexels.com/video-files/5982194/5982194-hd_1920_1080_25fps.mp4" 
  },
  {
    title: "Tus Finanzas, Claras y Simples",
    description: "Visualiza ingresos y comisiones sin hojas de cálculo.",
    videoSrc: "https://videos.pexels.com/video-files/8343431/8343431-hd_1920_1080_25fps.mp4"
  }
];

export default function TutorialsSection() {
  return (
    <section id="tutorials" className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          Tan fácil que no necesita <span className="text-secondary">manual de instrucciones</span>.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-foreground/80">
          Pero por si acaso, aquí tienes una <span className='font-bold text-foreground'>muestra</span> de lo intuitiva que es nuestra plataforma.
        </p>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {tutorials.map((tutorial, index) => (
            <div key={index} className="border border-border rounded-lg overflow-hidden card-neon-hover p-4 flex flex-col">
              <div className="rounded-md overflow-hidden aspect-video">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  src={tutorial.videoSrc}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className='flex-grow flex flex-col justify-center text-center mt-4'>
                <h3 className="text-xl font-bold text-foreground">{tutorial.title}</h3>
                <p className="mt-2 text-foreground/70">{tutorial.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}