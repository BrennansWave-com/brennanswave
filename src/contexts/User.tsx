"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { User, UserContextType } from "@/types/user";
import { authUtils } from "@/lib/authUtils";

const AUTH_EVENT = "brennan-auth-change";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  const initializeUser = () => {
    if (authUtils.isAuthenticated()) {
      const currentUser = authUtils.getCurrentUser();
      const currentToken = authUtils.getToken();
      if (currentUser && currentToken) {
        setUserState({ ...currentUser, token: currentToken });
        setToken(currentToken);
      } else {
        setUserState(null);
        setToken(null);
      }
    } else {
      setUserState(null);
      setToken(null);
    }
  };

  useEffect(() => {
    initializeUser();
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleAuthChange = () => {
      initializeUser();
    };
    if (typeof window !== "undefined") {
      window.addEventListener(AUTH_EVENT, handleAuthChange);
      return () => window.removeEventListener(AUTH_EVENT, handleAuthChange);
    }
  }, []);

  const logout = () => {
    authUtils.logout();
    setUserState(null);
    setToken(null);
  };

  const setUser = (userData: User | null) => {
    if (userData) {
      authUtils.setUser(userData);
      setUserState(userData);
      if (userData.token) {
        setToken(userData.token);
      }
    } else {
      logout();
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
    }
  };

  const getToken = () => token;

  const refreshUser = (): Promise<User> => {
    return new Promise((resolve, reject) => {
      if (authUtils.isAuthenticated()) {
        const currentUser = authUtils.getCurrentUser();
        const currentToken = authUtils.getToken();
        if (currentUser && currentToken) {
          const updatedUser = { ...currentUser, token: currentToken };
          setUserState(updatedUser);
          setToken(currentToken);
          resolve(updatedUser);
        } else {
          setUserState(null);
          setToken(null);
          reject(new Error("User is not authenticated"));
        }
      } else {
        setUserState(null);
        setToken(null);
        reject(new Error("User is not authenticated"));
      }
    });
  };

  const value: UserContextType = {
    user,
    setUser,
    logout,
    isAuthenticated,
    updateUser,
    refreshUser,
    loading,
    getToken,
    token,
  };

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};
