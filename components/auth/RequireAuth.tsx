"use client";

import { useAuthSession } from "@/hooks/use-auth-session";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RequireAuthProps {
  children: React.ReactNode;
  /** Jika true, hanya akun dengan isAdmin=true yang boleh mengakses. */
  requireAdmin?: boolean;
}

/**
 * Guard sisi klien — backend belum punya session cookie sungguhan,
 * jadi status login disimpan di Zustand (persisted) dan divalidasi di sini.
 */
export function RequireAuth({ children, requireAdmin = false }: RequireAuthProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuthSession();

  const isWrongRole = requireAdmin && user && !user.isAdmin;

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (isWrongRole) {
      router.replace("/dashboard");
    }
  }, [isLoading, isAuthenticated, isWrongRole, router]);

  if (isLoading || !isAuthenticated || isWrongRole) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-surface-bg">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-body-md text-on-surface-variant">Memuat sesi…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
