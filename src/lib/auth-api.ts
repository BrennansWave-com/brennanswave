/**
 * Brennan's Wave auth API – talks to WordPress REST API (brennan/v1).
 * Set NEXT_PUBLIC_API_URL to your WordPress site root (e.g. https://brennanswave.info).
 */

const getApiBase = () => {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL ?? window.location.origin;
  }
  return process.env.NEXT_PUBLIC_API_URL ?? "";
};

export type AuthUser = {
  ID: number;
  user_login: string;
  user_email: string;
  display_name: string;
  first_name: string;
  last_name: string;
  image: string | null;
  phone: string;
};

export type LoginResponse =
  | { success: true; user: AuthUser; token: string; application_password: string }
  | { success: false; error: string };

export type RegisterWithSetPassEmailResponse =
  | { success: true; message: string }
  | { success: false; error: string };

export type SetPasswordResponse =
  | { success: true; message: string; user: AuthUser; token: string }
  | { success: false; error: string };

export async function registerWithSetPassEmail(
  firstName: string,
  lastName: string,
  email: string,
  setPasswordBaseUrl?: string
): Promise<RegisterWithSetPassEmailResponse> {
  const base = getApiBase().replace(/\/$/, "");
  const url = `${base}/wp-json/brennan/v1/register-with-set-pass-email`;
  const body: { firstName: string; lastName: string; email: string; set_password_base_url?: string } = {
    firstName,
    lastName,
    email,
  };
  if (setPasswordBaseUrl) body.set_password_base_url = setPasswordBaseUrl;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as RegisterWithSetPassEmailResponse & { success?: boolean };
  if (!res.ok) {
    return {
      success: false,
      error: (data as { error?: string }).error ?? "Registration failed.",
    };
  }
  if (data.success && "message" in data) {
    return data as Extract<RegisterWithSetPassEmailResponse, { success: true }>;
  }
  return {
    success: false,
    error: (data as { error?: string }).error ?? "Invalid response.",
  };
}

export async function setPasswordWithToken(
  token: string,
  password: string
): Promise<SetPasswordResponse> {
  const base = getApiBase().replace(/\/$/, "");
  const url = `${base}/wp-json/brennan/v1/set-password`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });
  const data = (await res.json()) as SetPasswordResponse & { success?: boolean };
  if (!res.ok) {
    return {
      success: false,
      error: (data as { error?: string }).error ?? "Failed to set password.",
    };
  }
  if (data.success && "user" in data && "token" in data) {
    return data as Extract<SetPasswordResponse, { success: true }>;
  }
  return {
    success: false,
    error: (data as { error?: string }).error ?? "Invalid response.",
  };
}

export async function login(login: string, password: string): Promise<LoginResponse> {
  const base = getApiBase().replace(/\/$/, "");
  const url = `${base}/wp-json/brennan/v1/login`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, password }),
  });
  const data = (await res.json()) as LoginResponse & { success?: boolean };
  if (!res.ok) {
    return {
      success: false,
      error: (data as { error?: string }).error ?? "Login failed.",
    };
  }
  if (data.success && "user" in data && "token" in data) {
    return data as Extract<LoginResponse, { success: true }>;
  }
  return {
    success: false,
    error: (data as { error?: string }).error ?? "Invalid response.",
  };
}

const TOKEN_KEY = "brennan_token";
const USER_KEY = "brennan_user";

export function setAuth(token: string, user: AuthUser): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new CustomEvent("brennan-auth-change"));
}

export function clearAuth(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new CustomEvent("brennan-auth-change"));
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!getStoredToken();
}
