import type { User } from "../types/Auth";

export function parseJwt(token: string): User | null {
  try {
    const base64 = token.split(".")[1];
    const decoded = atob(base64);
    return JSON.parse(decoded) as User;
  } catch {
    return null;
  }
}