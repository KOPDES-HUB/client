"use client";

import { useAuthStore } from "@/app/stores/auth-store";
import { getMe } from "@/lib/api/auth";
import { useEffect, useState } from "react";

export function useAuthSession() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [isLoading, setIsLoading] = useState(!user);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    getMe()
      .then((res) => {
        if (cancelled) return;
        if (res.success && res.data) {
          setUser(res.data);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        if (!cancelled) setIsAuthenticated(false);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user, setUser]);

  return { isAuthenticated, isLoading, user };
}
