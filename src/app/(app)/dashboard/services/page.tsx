"use client";

import { useEffect, useState } from 'react';
import type { Service } from '@/types/service';
import { Trash2, Edit } from 'lucide-react';
import Modal from '@/components/ui/Modal';

interface ServiceDto {
  name: string;
  price: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newService, setNewService] = useState<ServiceDto>({ name: '', price: 0 });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', onConfirm: () => {}, showCancel: false });
  
  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/services');
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al obtener los servicios');
      }
      const data = await res.json();
      setServices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Un error desconocido ocurrió');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newService, price: Number(newService.price) }),
      });
      setNewService({ name: '', price: 0 });
      await fetchServices();
    } catch (err) {
      setModalContent({ title: 'Error', message: err instanceof Error ? err.message : 'Error al crear el servicio.', onConfirm: () => setIsModalOpen(false), showCancel: false });
      setIsModalOpen(true);
    }
  };

  const handleDeactivate = async (serviceId: string, serviceName: string) => {
    setModalContent({
      title: 'Confirmar Desactivación',
      message: `¿Estás seguro de que quieres desactivar el servicio "${serviceName}"?`,
      showCancel: true,
      onConfirm: async () => {
        setIsModalOpen(false);
        try {
          await fetch(`/api/services/${serviceId}`, { method: 'DELETE' });
          await fetchServices();
        } catch (err) {
          setModalContent({ title: 'Error', message: 'Error al desactivar el servicio.', onConfirm: () => setIsModalOpen(false), showCancel: false });
          setIsModalOpen(true);
        }
      },
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-primary mb-6">Gestión de Servicios</h1>
        <div className="bg-background/50 border border-border p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-secondary mb-4">Añadir Nuevo Servicio</h2>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input type="text" placeholder="Nombre del Servicio (ej: Corte de Pelo)" value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} className="flex-1 bg-white/5 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary" required />
            <input type="number" placeholder="Precio (ej: 12000)" value={newService.price || ''} onChange={(e) => setNewService({ ...newService, price: parseFloat(e.target.value) || 0 })} className="w-40 bg-white/5 border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary" required />
            <button type="submit" className="bg-primary text-secondary font-bold px-6 py-2 rounded-md hover:scale-105 transition-transform">
              Guardar Servicio
            </button>
          </form>
        </div>
        <div className="bg-background/50 border border-border rounded-lg">
          <h2 className="text-xl font-semibold text-secondary p-4 border-b border-border">Tus Servicios Activos</h2>
          {loading && <p className="p-4 text-foreground/70">Cargando...</p>}
          {error && <p className="p-4 text-red-500">{error}</p>}
          {!loading && !error && (
            <ul>
              {services.length === 0 ? <li className="p-4 text-foreground/70">Aún no has añadido ningún servicio.</li>
              : services.map((service) => (
                  <li key={service.id} className="flex items-center justify-between p-4 border-b border-border last:border-b-0">
                    <div>
                      <p className="font-semibold text-foreground">{service.name}</p>
                      <p className="text-sm text-foreground/60">ARS ${service.price.toLocaleString('es-AR')}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={() => alert('Próximamente!')} className="text-foreground/70 hover:text-secondary"><Edit className="w-5 h-5" /></button>
                      <button onClick={() => handleDeactivate(service.id, service.name)} className="text-foreground/70 hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
                    </div>
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