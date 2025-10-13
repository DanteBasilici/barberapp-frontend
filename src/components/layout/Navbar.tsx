"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";

const navLinks = [
  { name: "Características", href: "/#features" },
  { name: "Precios", href: "/#pricing" },
  { name: "Tutoriales", href: "/#tutorials" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" onClick={() => setIsMenuOpen(false)}>
          <Image
            src="/images/barberapp.png"
            alt="BarberApp Logo"
            width={160}
            height={45}
            className="animate-logo-glow transition-transform duration-300 hover:scale-105"
            priority
          />
        </Link>
        
        <ul className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="text-foreground hover:text-primary transition-colors">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center">
          <Link href="/auth/login" className="bg-primary text-secondary font-semibold px-4 py-2 rounded-md hover:scale-105 transition-transform">
            Login
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className={`relative h-10 w-10 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
              <Image
                src="/images/tijera.png"
                alt="Menú"
                width={40}
                height={40}
                className={`animate-logo-glow transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
              />
            </div>
          </button>
        </div>
      </nav>

      <div className={`fixed top-0 left-0 w-full h-screen bg-background z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex justify-between items-center p-4 border-b border-border">
           <Link href="/" onClick={() => setIsMenuOpen(false)}>
             <Image
                src="/images/barberapp.png"
                alt="BarberApp Logo"
                width={160}
                height={45}
                className="animate-logo-glow"
              />
           </Link>
          <button onClick={() => setIsMenuOpen(false)} className="text-primary">
            <X className="h-10 w-10" />
          </button>
        </div>
        <ul className="flex flex-col items-center justify-center h-full space-y-8 -mt-20">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="text-3xl font-bold text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/auth/login" className="mt-8 bg-primary text-secondary font-bold text-xl px-8 py-4 rounded-lg hover:scale-105 transition-transform" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}