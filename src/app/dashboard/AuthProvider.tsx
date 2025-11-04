"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import axiosInstance from "lib/axios";

export const AuthContext = createContext({
  user: null as null | { role: string; id: string },
  loading: true,
});

export function AuthWrapper({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
        console.log("Auth init started");
        try {
        const { data } = await axiosInstance.get("/auth/verify");
        console.log("Verify success", data);
        setUser(data.user);
        } catch (err) {
        console.log("Verify failed", err);
        try {
            await axiosInstance.get("/auth/refresh");
            const { data } = await axiosInstance.get("/auth/verify");
            console.log("Refresh verify success", data);
            setUser(data.user);
        } catch (err2) {
            console.log("Refresh failed", err2);
            setUser(null);
        }
        } finally {
        console.log("Auth init finished");
        setLoading(false);
        }
    }
    initAuth();
    }, []);


  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
