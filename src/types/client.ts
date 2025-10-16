export interface Client {
  id: string;
  name: string;
  phone: string | null;
  notes: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}