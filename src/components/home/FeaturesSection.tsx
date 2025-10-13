import { UsersRound, BookUser, CircleDollarSign } from 'lucide-react';

const features = [
  {
    icon: <UsersRound className="h-12 w-12 text-primary" />,
    title: "Gestiona tu Equipo",
    description: "Invita a tus barberos a la app, define sus comisiones y lleva un registro claro de los pagos. Todo en un solo lugar."
  },
  {
    icon: <BookUser className="h-12 w-12 text-primary" />,
    title: "Conoce a tus Clientes",
    description: "Crea perfiles para tus clientes, lleva un historial de sus cortes y añade notas para ofrecer un servicio 100% personalizado."
  },
  {
    icon: <CircleDollarSign className="h-12 w-12 text-primary" />,
    title: "Control Financiero Simple",
    description: "Registra cada corte al instante. El sistema calcula automáticamente los ingresos totales y las comisiones para cada barbero."
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          Todo lo que necesitas, <span className="text-secondary">y nada de lo que no</span>.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-foreground/80">
          BarberApp está diseñado para ser potente pero increíblemente simple. Menos tiempo administrando, más tiempo creando.
        </p>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-background border border-border rounded-lg p-6 flex flex-col items-center card-neon-hover">
              {feature.icon}
              <h3 className="mt-4 text-xl font-bold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}