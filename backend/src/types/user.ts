export interface UserPayload {
  id: number;
  role: 'admin' | 'user' | 'banned';
}
