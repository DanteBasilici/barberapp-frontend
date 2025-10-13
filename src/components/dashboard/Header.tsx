"use client";

import { Menu } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { useUser } from '@/hooks/useUser';
import Image from 'next/image';

interface HeaderProps {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ setIsSidebarOpen }: HeaderProps) {
  const { user, loading } = useUser();

  return (
    <header className="h-20 flex-shrink-0 flex items-center justify-between px-8 border-b border-border">
      <div className="flex items-center">
        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden mr-4 text-primary">
          <Menu className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
          {loading ? (
            <p className="text-sm text-foreground/60">Cargando...</p>
          ) : (
            <p className="text-sm text-foreground/60">Bienvenido de vuelta, {user?.name || 'Barbero'}!</p>
          )}
        </div>
      </div>
      <div>
        {user?.avatarUrl ? (
          <Image
            src={user.avatarUrl}
            alt={user.name || 'Avatar'}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-secondary font-bold">
            {user?.name?.charAt(0) || 'B'}
          </div>
        )}
      </div>
    </header>
  );
}