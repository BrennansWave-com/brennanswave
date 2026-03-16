"use client";

import {
  getStoredToken,
  getStoredUser,
  setAuth,
  clearAuth,
  type AuthUser,
} from "@/lib/auth-api";

const AUTH_EVENT = "brennan-auth-change";

export const authUtils = {
  isAuthenticated: (): boolean => {
    return !!(getStoredToken() && getStoredUser());
  },

  getCurrentUser: (): AuthUser | null => {
    return getStoredUser();
  },

  getToken: (): string | null => {
    return getStoredToken();
  },

  setUser: (user: AuthUser | (AuthUser & { token?: string }) | null): void => {
    if (!user) {
      clearAuth();
      return;
    }
    const token = "token" in user && user.token ? user.token : getStoredToken();
    if (token) {
      setAuth(token, user);
    }
  },

  logout: (): void => {
    clearAuth();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(AUTH_EVENT));
    }
  },

  setAuthData: (token: string, user: AuthUser): void => {
    setAuth(token, user);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(AUTH_EVENT));
    }
  },
};
