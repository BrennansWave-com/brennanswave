import type { AuthUser } from "@/lib/auth-api";

/** Extended user with optional token and profile fields (billing, shipping, etc.). */
export type User = AuthUser & {
  token?: string;
  id?: number | string;
  email?: string;
  username?: string;
  billing?: BillingAddress;
  shipping?: ShippingAddress;
  registration_status?: string;
};

export interface BillingAddress {
  first_name?: string;
  last_name?: string;
  company?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  phone?: string;
}

export interface ShippingAddress {
  first_name?: string;
  last_name?: string;
  company?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
}

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

/** Shape used by server actions (e.g. login) for stored user info. */
export interface UserProps {
  ID: string;
  display_name: string;
  user_login: string;
  user_email: string;
  first_name: string;
  last_name: string;
  phone: string;
  image: string;
  website: string;
  token: string;
  user_nicename: string;
  user_registered: string;
  capabilities: string[];
  username: string;
}

/** WordPress/API user list item (e.g. wp-json/brennan/v1/users/). */
export interface UserListItem {
  id: number;
  name: string;
  image: { url: string };
  occupation: string;
  email?: string;
  user_email?: string;
  user_nicename?: string;
  created_at?: string;
}

/** Single user detail response. */
export interface UserDetail extends UserListItem {
  bio?: string;
  user_login?: string;
  first_name?: string;
  last_name?: string;
  user_email?: string;
}
