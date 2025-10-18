import Link from 'next/link';
import { Check } from 'lucide-react';

const featuresIncluded = [
  "Gestión de barberos ilimitada",
  "Registro de clientes ilimitado",
  "Control de cortes y finanzas",
  "Dashboard de administrador",
  "Soporte prioritario por WhatsApp",
  "Actualizaciones constantes"
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-background/95 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Columna de Texto a la Izquierda */}
          <div className="lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Un precio simple. <span className="text-primary">Potencia ilimitada.</span>
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              Sin contratos, sin sorpresas. Cancela cuando quieras. Todo incluido.
            </p>
            
            <div className="mt-8 bg-background border border-border rounded-lg p-8">
              <h3 className="text-2xl font-bold text-secondary">Plan BarberApp</h3>
              <p className="mt-2 text-5xl font-extrabold text-foreground">
                ARS $12.000
                <span className="text-lg font-normal text-foreground/70">/mes</span>
              </p>
              <p className="mt-1 text-sm text-foreground/60">
                Precio actualizado anualmente según el valor de un corte completo.
              </p>
              <ul className="mt-6 space-y-3 text-left">
                {featuresIncluded.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/auth/login" className="mt-8 block w-full text-center bg-primary text-secondary font-bold text-lg py-3 rounded-lg hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                Empezar a Crecer
              </Link>
            </div>
          </div>

          {/* Columna de Video a la Derecha */}
          <div className="lg:order-2 aspect-video w-full rounded-lg overflow-hidden border border-border">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              src="/precio.mp4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}