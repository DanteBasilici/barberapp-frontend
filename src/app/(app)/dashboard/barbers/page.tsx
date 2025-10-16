"use client";

import { useEffect, useState } from 'react';
import type { Barber } from '@/types/barber';
import { Trash2, Edit, Save, XCircle } from 'lucide-react';

interface CreateBarberDto {
  name: string;
  email: string;
}

export default function BarbersPage() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newBarber, setNewBarber] = useState<CreateBarberDto>({ name: '', email: '' });

  const [editingBarberId, setEditingBarberId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

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
        const res = await fetch(`/api/barbers/${barberId}`, { method: 'DELETE' });
        if (!res.ok) {
          throw new Error('No se pudo desactivar al barbero');
        }
        await fetchBarbers();
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Error al desactivar');
      }
    }
  };

  const handleEdit = (barber: Barber) => {
    setEditingBarberId(barber.id);
    setEditingName(barber.name);
  };

  const handleCancelEdit = () => {
    setEditingBarberId(null);
    setEditingName('');
  };

  const handleSaveEdit = async (barberId: string) => {
    try {
      const res = await fetch(`/api/barbers/${barberId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editingName }),
      });
      if (!res.ok) {
        throw new Error('No se pudo actualizar el barbero');
      }
      handleCancelEdit();
      await fetchBarbers();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al actualizar');
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
                  {editingBarberId === barber.id ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input type="text" value={editingName} onChange={(e) => setEditingName(e.target.value)} className="bg-white/10 border border-secondary rounded-md px-2 py-1 text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                      <p className="text-sm text-foreground/60">{barber.email}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold text-foreground">{barber.name}</p>
                      <p className="text-sm text-foreground/60">{barber.email}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    {editingBarberId === barber.id ? (
                      <>
                        <button onClick={() => handleSaveEdit(barber.id)} className="text-green-400 hover:text-green-300 transition-colors"><Save className="w-5 h-5" /></button>
                        <button onClick={handleCancelEdit} className="text-red-500 hover:text-red-400 transition-colors"><XCircle className="w-5 h-5" /></button>
                      </>
                    ) : (
                      <>
                        <span className={`px-2 py-1 text-xs rounded-full ${barber.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {barber.status}
                        </span>
                        <button onClick={() => handleEdit(barber)} className="text-foreground/70 hover:text-secondary transition-colors"><Edit className="w-5 h-5" /></button>
                        <button onClick={() => handleDeactivate(barber.id)} className="text-foreground/70 hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
                      </>
                    )}
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