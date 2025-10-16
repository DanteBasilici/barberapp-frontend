"use client";

import { useEffect, useState } from 'react';
import type { Barber } from '@/types/barber';
import { Trash2, Edit } from 'lucide-react';

interface CreateBarberDto {
  name: string;
  email: string;
}

export default function BarbersPage() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newBarber, setNewBarber] = useState<CreateBarberDto>({ name: '', email: '' });

  const fetchBarbers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/barbers');
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al obtener los barberos');
      }
      const data = await res.json();
      setBarbers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Un error desconocido ocurrió');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBarbers();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/barbers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBarber),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al crear el barbero');
      }
      
      setNewBarber({ name: '', email: '' });
      await fetchBarbers();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al crear');
    }
  };

  const handleDeactivate = async (barberId: string) => {
    if (confirm('¿Estás seguro de que quieres desactivar a este barbero?')) {
      try {
        const res = await fetch(`/api/barbers/${barberId}`, {
          method: 'DELETE',
        });
        if (!res.ok) {
          throw new Error('No se pudo desactivar al barbero');
        }
        await fetchBarbers(); // Refresca la lista
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Error al desactivar');
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Gestión de Barberos</h1>

      <div className="bg-background/50 border border-border p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-secondary mb-4">Invitar Nuevo Barbero</h2>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Nombre del Barbero"
            value={newBarber.name}
            onChange={(e) => setNewBarber({ ...newBarber, name: e.target.value })}
            className="flex-1 bg-white/5 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="email"
            placeholder="Email del Barbero"
            value={newBarber.email}
            onChange={(e) => setNewBarber({ ...newBarber, email: e.target.value })}
            className="flex-1 bg-white/5 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button
            type="submit"
            className="bg-primary text-secondary font-bold px-6 py-2 rounded-md hover:scale-105 transition-transform"
          >
            Invitar
          </button>
        </form>
      </div>

      <div className="bg-background/50 border border-border rounded-lg">
        <h2 className="text-xl font-semibold text-secondary p-4 border-b border-border">Tu Equipo</h2>
        {loading && <p className="p-4 text-foreground/70">Cargando barberos...</p>}
        {error && <p className="p-4 text-red-500">{error}</p>}
        {!loading && !error && (
          <ul>
            {barbers.length === 0 ? (
              <li className="p-4 text-foreground/70">Aún no has invitado a ningún barbero.</li>
            ) : (
              barbers.map((barber) => (
                <li key={barber.id} className="flex items-center justify-between p-4 border-b border-border last:border-b-0">
                  <div>
                    <p className="font-semibold text-foreground">{barber.name}</p>
                    <p className="text-sm text-foreground/60">{barber.email}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => alert('Función de editar próximamente!')} className="text-foreground/70 hover:text-secondary transition-colors">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDeactivate(barber.id)} className="text-foreground/70 hover:text-red-500 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}