"use client";

import { useEffect, useState } from 'react';
import type { Cut } from '@/types/cut';
import { Trash2, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import Modal from '@/components/ui/Modal';

export default function CutsListPage() {
  const [cuts, setCuts] = useState<Cut[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', onConfirm: () => {}, showCancel: false });

  const fetchCuts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/cuts');
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al obtener los cortes');
      }
      const data = await res.json();
      setCuts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Un error desconocido ocurrió');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCuts();
  }, []);

  const handleCancelCut = (cut: Cut) => {
    setModalContent({
      title: 'Confirmar Anulación',
      message: `¿Estás seguro de que quieres anular el corte de "${cut.client.name}" por un valor de $${cut.price.toLocaleString('es-AR')}? Esta acción no se puede deshacer.`,
      showCancel: true,
      onConfirm: async () => {
        setIsModalOpen(false);
        try {
          const res = await fetch(`/api/cuts/${cut.id}`, { method: 'DELETE' });
          if (!res.ok) throw new Error('No se pudo anular el corte');
          await fetchCuts(); // Refresca la lista
        } catch (err) {
          setModalContent({ title: 'Error', message: 'Error al anular el corte.', onConfirm: () => setIsModalOpen(false), showCancel: false });
          setIsModalOpen(true);
        }
      },
    });
    setIsModalOpen(true);
  };
  
  return (
    <>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-primary">Mis Cortes del Día</h1>
          <Link href="/dashboard/cuts/new" className="flex items-center justify-center gap-2 bg-primary text-secondary font-bold px-4 py-3 rounded-md hover:scale-105 transition-transform w-full sm:w-auto">
            <PlusCircle className="w-5 h-5" />
            <span>Registrar Corte</span>
          </Link>
        </div>
        
        <div className="bg-background/50 border border-border rounded-lg">
          <h2 className="text-xl font-semibold text-secondary p-4 border-b border-border">Últimos Registros</h2>
          {loading && <p className="p-4 text-foreground/70">Cargando cortes...</p>}
          {error && <p className="p-4 text-red-500">{error}</p>}
          {!loading && !error && (
            <ul>
              {cuts.length === 0 ? <p className="p-4 text-foreground/70">No tienes cortes registrados hoy.</p>
              : (
                cuts.map((cut) => (
                  <li key={cut.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-border last:border-b-0 gap-2">
                    <div className='flex-1'>
                      <p className="font-semibold text-foreground">{cut.client.name} - <span className="text-secondary">{cut.service.name}</span></p>
                      <p className="text-sm text-foreground/60">{new Date(cut.createdAt).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })} hs</p>
                    </div>
                    <div className="flex items-center gap-4 self-end sm:self-center">
                      <span className="font-bold text-lg text-foreground">ARS ${cut.price.toLocaleString('es-AR')}</span>
                      <button onClick={() => handleCancelCut(cut)} className="text-foreground/70 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-500/10">
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