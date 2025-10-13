"use client";

import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, Users, Scissors, DollarSign, LogOut } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Barberos', href: '/dashboard/barbers' },
  { icon: Scissors, label: 'Clientes', href: '/dashboard/clients' },
  { icon: DollarSign, label: 'Finanzas', href: '/dashboard/finances' },
];

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) {
  return (
    <>
      <aside className="w-64 flex-shrink-0 bg-background border-r border-border flex-col hidden md:flex">
        <SidebarContent />
      </aside>

      <div 
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsSidebarOpen(false)}
      />
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-background border-r border-border z-50 flex flex-col md:hidden transform transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}

const SidebarContent = () => {
  return (
    <>
      <div className="h-20 flex items-center justify-center border-b border-border">
        <Link href="/">
          <Image
            src="/images/barberapp.png"
            alt="BarberApp Logo"
            width={140}
            height={40}
            className="animate-logo-glow"
          />
        </Link>
      </div>
      <nav className="flex-grow px-4 py-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className="flex items-center p-3 rounded-lg text-foreground/80 hover:bg-white/5 hover:text-primary transition-colors">
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-border">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a 
          href="http://localhost:3001/auth/logout"
          className="w-full flex items-center p-3 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>Cerrar Sesión</span>
        </a>
      </div>
    </>
  );
};