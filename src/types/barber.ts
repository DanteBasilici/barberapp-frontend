export interface Barber {
  id: string;
  email: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
  barbershopId: string;
  createdAt: string; // Las fechas vienen como strings en JSON
  updatedAt: string;
}