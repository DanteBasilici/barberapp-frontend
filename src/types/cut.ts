import type { Client } from './client';
import type { Service } from './service';

export interface Cut {
  id: string;
  price: number;
  notes: string | null;
  status: 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  client: Pick<Client, 'name'>;
  service: Pick<Service, 'name'>;
}