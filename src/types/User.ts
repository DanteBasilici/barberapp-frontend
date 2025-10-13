export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  role: string;
}