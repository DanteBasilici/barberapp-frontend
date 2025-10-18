"use client";

import { useEffect, useState } from 'react';
import type { Client } from '@/types/client';
import { Trash2, Edit, Save, XCircle } from 'lucide-react';
import Modal from '@/components/ui/Modal';

interface ClientDto {
  name: string;
  phone: string;
  notes: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newClient, setNewClient] = useState<ClientDto>({ name: '', phone: '', notes: '' });

  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [editingData, setEditingData] = useState<ClientDto>({ name: '', phone: '', notes: '' });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', onConfirm: () => {}, showCancel: false });
  
  const fetchClients = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/clients');
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al obtener los clientes');
      }
      const data = await res.json();
      setClients(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Un error desconocido ocurrió');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClient),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al crear el cliente');
      }

      setModalContent({ title: '¡Éxito!', message: `El cliente ${newClient.name} ha sido creado.`, onConfirm: () => setIsModalOpen(false), showCancel: false });
      setIsModalOpen(true);
      
      setNewClient({ name: '', phone: '', notes: '' });
      await fetchClients();
    } catch (err) {
      setModalContent({ title: 'Error', message: err instanceof Error ? err.message : 'Ocurrió un error inesperado.', onConfirm: () => setIsModalOpen(false), showCancel: false });
      setIsModalOpen(true);
    }
  };

  const handleDeactivate = async (clientId: string, clientName: string) => {
    setModalContent({
      title: 'Confirmar Desactivación',
      message: `¿Estás seguro de que quieres desactivar a ${clientName}?`,
      showCancel: true,
      onConfirm: async () => {
        setIsModalOpen(false);
        try {
          await fetch(`/api/clients/${clientId}`, { method: 'DELETE' });
          await fetchClients();
        } catch (err) {
          setModalContent({ title: 'Error', message: 'Error al desactivar el cliente.', onConfirm: () => setIsModalOpen(false), showCancel: false });
          setIsModalOpen(true);
        }
      },
    });
    setIsModalOpen(true);
  };
  
  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setEditingData({ name: client.name, phone: client.phone || '', notes: client.notes || '' });
  };

  const handleCancelEdit = () => {
    setEditingClient(null);
  };

  const handleSaveEdit = async (clientId: string) => {
    try {
      await fetch(`/api/clients/${clientId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingData),
      });
      setEditingClient(null);
      await fetchClients();
    } catch (err) {
      setModalContent({ title: 'Error', message: 'Error al actualizar el cliente.', onConfirm: () => setIsModalOpen(false), showCancel: false });
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-primary mb-6">Gestión de Clientes</h1>
        <div className="bg-background/50 border border-border p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-secondary mb-4">Añadir Nuevo Cliente</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <input type="text" placeholder="Nombre del Cliente" value={newClient.name} onChange={(e) => setNewClient({ ...newClient, name: e.target.value })} className="md:col-span-1 bg-white/5 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary" required />
            <input type="tel" placeholder="Teléfono (Opcional)" value={newClient.phone} onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })} className="md:col-span-1 bg-white/5 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            <button type="submit" className="md:col-span-1 bg-primary text-secondary font-bold px-6 py-2 rounded-md hover:scale-105 transition-transform h-11">
              Guardar Cliente
            </button>
            <textarea placeholder="Notas (preferencias, alergias, etc.)" value={newClient.notes} onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })} className="md:col-span-3 bg-white/5 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary" rows={2}></textarea>
          </form>
        </div>
        <div className="bg-background/50 border border-border rounded-lg">
          <h2 className="text-xl font-semibold text-secondary p-4 border-b border-border">Tus Clientes</h2>
          {loading && <p className="p-4 text-foreground/70">Cargando clientes...</p>}
          {error && <p className="p-4 text-red-500">{error}</p>}
          {!loading && !error && (
            <ul>
              {clients.length === 0 ? <li className="p-4 text-foreground/70">Aún no has añadido ningún cliente.</li>
              : clients.map((client) => (
                  <li key={client.id} className="p-4 border-b border-border last:border-b-0">
                    {editingClient?.id === client.id ? (
                      <div className="flex flex-col gap-2">
                        <input type="text" value={editingData.name} onChange={(e) => setEditingData({...editingData, name: e.target.value})} className="bg-white/10 border border-secondary rounded-md px-2 py-1 w-full text-foreground" />
                        <input type="tel" value={editingData.phone} onChange={(e) => setEditingData({...editingData, phone: e.target.value})} className="bg-white/10 border border-border rounded-md px-2 py-1 w-full text-foreground" />
                        <textarea value={editingData.notes} onChange={(e) => setEditingData({...editingData, notes: e.target.value})} className="bg-white/10 border border-border rounded-md px-2 py-1 w-full text-foreground" rows={2}></textarea>
                        <div className="flex items-center gap-4 self-end mt-2">
                          <button onClick={() => handleSaveEdit(client.id)} className="text-green-400 hover:text-green-300 transition-colors"><Save className="w-5 h-5" /></button>
                          <button onClick={handleCancelEdit} className="text-red-500 hover:text-red-400 transition-colors"><XCircle className="w-5 h-5" /></button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{client.name}</p>
                          <p className="text-sm text-foreground/60">{client.phone || 'Sin teléfono'}</p>
                          {client.notes && <p className="text-xs text-foreground/50 mt-1 italic">"{client.notes}"</p>}
                        </div>
                        <div className="flex items-center gap-4 self-end sm:self-center flex-shrink-0">
                          <button onClick={() => handleEdit(client)} className="text-foreground/70 hover:text-secondary transition-colors"><Edit className="w-5 h-5" /></button>
                          <button onClick={() => handleDeactivate(client.id, client.name)} className="text-foreground/70 hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
                        </div>
                      </div>
                    )}
                  </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalContent.title}>
        <p className="text-sm text-foreground/80">{modalContent.message}</p>
        <div className="mt-6 flex justify-end gap-4">
          {modalContent.showCancel && <button type="button" onClick={() => setIsModalOpen(false)} className="inline-flex justify-center rounded-md border border-transparent bg-white/10 px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-white/20 focus:outline-none">Cancelar</button>}
          <button type="button" onClick={modalContent.onConfirm} className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-bold text-secondary focus:outline-none ${modalContent.title.includes('Confirmar') ? 'bg-red-600 hover:bg-red-500' : 'bg-primary hover:bg-opacity-80'}`}>
            {modalContent.title.includes('Confirmar') ? 'Confirmar' : 'Aceptar'}
          </button>
        </div>
      </Modal>
    </>
  );
}