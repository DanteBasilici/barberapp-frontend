"use client";

import { useEffect, useState } from 'react';
import type { Client } from '@/types/client';
import type { Service } from '@/types/service';
import Modal from '@/components/ui/Modal';
import { PlusCircle } from 'lucide-react';

export default function RegisterCutPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  
  const [selectedClientId, setSelectedClientId] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [notes, setNotes] = useState('');
  
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertModalContent, setAlertModalContent] = useState({ title: '', message: '' });

  // Estados para el modal de "Nuevo Cliente"
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const [newClientName, setNewClientName] = useState('');

  const fetchInitialData = async () => {
    try {
      const [clientsRes, servicesRes] = await Promise.all([
        fetch('/api/clients'),
        fetch('/api/services'),
      ]);
      const clientsData = await clientsRes.json();
      const servicesData = await servicesRes.json();
      setClients(clientsData);
      setServices(servicesData);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleCreateNewClient = async () => {
    if (!newClientName.trim()) {
      alert('El nombre del cliente no puede estar vacío.');
      return;
    }
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newClientName }),
      });
      if (!res.ok) throw new Error('No se pudo crear el cliente.');
      
      const createdClient = await res.json();
      
      // Cerramos modal, reseteamos el nombre y refrescamos la lista de clientes
      setIsNewClientModalOpen(false);
      setNewClientName('');
      await fetchInitialData(); // Volvemos a cargar todo
      
      // ¡Seleccionamos automáticamente al cliente recién creado!
      setSelectedClientId(createdClient.id);

    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error desconocido');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedClientId || !selectedServiceId) {
      setAlertModalContent({ title: 'Error', message: 'Por favor, selecciona un cliente y un servicio.' });
      setIsAlertModalOpen(true);
      return;
    }

    try {
      const res = await fetch('/api/cuts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId: selectedClientId, serviceId: selectedServiceId, notes }),
      });

      if (!res.ok) throw new Error('Error al registrar el corte');

      setAlertModalContent({ title: '¡Éxito!', message: 'El corte ha sido registrado correctamente.' });
      setIsAlertModalOpen(true);

      setSelectedClientId('');
      setSelectedServiceId('');
      setNotes('');
    } catch (err) {
      setAlertModalContent({ title: 'Error', message: err instanceof Error ? err.message : 'Ocurrió un error.' });
      setIsAlertModalOpen(true);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-primary mb-6">Registrar Nuevo Corte</h1>
        <div className="bg-background/50 border border-border p-6 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="client" className="block text-sm font-medium text-secondary mb-2">1. Selecciona el Cliente</label>
              <div className="flex items-center gap-2">
                <select id="client" value={selectedClientId} onChange={(e) => setSelectedClientId(e.target.value)} className="w-full bg-white/5 border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="" disabled>Elige un cliente existente...</option>
                  {clients.map(client => <option key={client.id} value={client.id}>{client.name}</option>)}
                </select>
                <button type="button" onClick={() => setIsNewClientModalOpen(true)} className="flex-shrink-0 bg-secondary text-background p-2 rounded-full hover:bg-opacity-80 transition-transform hover:scale-105">
                  <PlusCircle className="w-7 h-7" />
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-secondary mb-2">2. Selecciona el Servicio</label>
              <select id="service" value={selectedServiceId} onChange={(e) => setSelectedServiceId(e.target.value)} className="w-full bg-white/5 border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="" disabled>Elige un servicio...</option>
                {services.map(service => <option key={service.id} value={service.id}>{service.name} - ${service.price.toLocaleString('es-AR')}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-secondary mb-2">3. Notas Adicionales (Opcional)</label>
              <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full bg-white/5 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary" rows={3}></textarea>
            </div>
            <div className="pt-4">
              <button type="submit" className="w-full bg-primary text-secondary font-bold text-lg py-3 rounded-md hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                Registrar Corte
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <Modal isOpen={isAlertModalOpen} onClose={() => setIsAlertModalOpen(false)} title={alertModalContent.title}>
        <p className="text-sm text-foreground/80">{alertModalContent.message}</p>
        <div className="mt-6 flex justify-end">
          <button type="button" onClick={() => setIsAlertModalOpen(false)} className="bg-primary text-secondary font-bold px-4 py-2 rounded-md">
            Aceptar
          </button>
        </div>
      </Modal>

      <Modal isOpen={isNewClientModalOpen} onClose={() => setIsNewClientModalOpen(false)} title="Crear Nuevo Cliente">
        <div className="space-y-4">
          <label htmlFor="newClientName" className="block text-sm font-medium text-foreground/80">Nombre del Cliente</label>
          <input id="newClientName" type="text" value={newClientName} onChange={(e) => setNewClientName(e.target.value)} className="w-full bg-white/5 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button type="button" onClick={() => setIsNewClientModalOpen(false)} className="bg-white/10 px-4 py-2 rounded-md text-sm font-medium text-foreground/80 hover:bg-white/20">
            Cancelar
          </button>
          <button type="button" onClick={handleCreateNewClient} className="bg-primary text-secondary font-bold px-4 py-2 rounded-md text-sm">
            Guardar Cliente
          </button>
        </div>
      </Modal>
    </>
  );
}