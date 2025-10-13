import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <Link href="/">
            <Image
              src="/images/barberapp.png"
              alt="BarberApp Logo"
              width={120}
              height={34}
              className="animate-logo-glow"
            />
          </Link>
        </div>
        <p className="text-sm text-foreground/60 mb-4 md:mb-0">
          &copy; {currentYear} BarberApp. Todos los derechos reservados.
        </p>
        <div className="flex items-center space-x-4">
          <a href="https://github.com/DanteBasilici" target="_blank" rel="noopener noreferrer" className="text-foreground transition-transform hover:scale-110 hover:drop-shadow-[0_0_5px_#F50057]">
            <Github className="h-6 w-6" />
          </a>
          <a href="https://www.linkedin.com/in/dante-ezequiel-basilici/" target="_blank" rel="noopener noreferrer" className="text-foreground transition-transform hover:scale-110 hover:drop-shadow-[0_0_5px_#00E5FF]">
            <Linkedin className="h-6 w-6" />
          </a>
          <a href="https://wa.me/5492615059243" target="_blank" rel="noopener noreferrer" className="text-foreground transition-transform hover:scale-110 hover:drop-shadow-[0_0_5px_#25D366]">
            <FaWhatsapp className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}