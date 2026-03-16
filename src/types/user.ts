import type { AuthUser } from "@/lib/auth-api";

export type User = AuthUser & {
  token?: string;
};

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (userData: Partial<User>) => void;
  refreshUser: () => Promise<User>;
  loading: boolean;
  token: string | null;
  getToken: () => string | null;
}
