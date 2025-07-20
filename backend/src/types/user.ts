export interface UserPayload {
  id: string;
  role: "admin" | "user" | "banned";
}
