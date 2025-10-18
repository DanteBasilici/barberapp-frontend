export interface Cut {
  id: string;
  price: number;
  commissionRate: number;
  barberEarnings: number;
  shopEarnings: number;
  notes: string | null;
  createdAt: string;
}