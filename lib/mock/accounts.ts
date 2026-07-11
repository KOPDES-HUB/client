import type { AuthUser } from "@/types/api";

export interface MockAccount {
  nik: string;
  email: string;
  password: string;
  user: AuthUser;
}

export const MOCK_ACCOUNTS: MockAccount[] = [
  {
    nik: "3201234567890001",
    email: "anggota@simpul.id",
    password: "password123",
    user: {
      id: "USR-ANGGOTA-001",
      username: "Budi Setiawan",
      email: "anggota@simpul.id",
      roles: ["ANGGOTA"],
      menus: [],
      isAdmin: false,
      statusRegistrasi: "DISETUJUI",
    },
  },
  {
    nik: "1231231231231231",
    email: "admin@simpul.id",
    password: "password123",
    user: {
      id: "USR-ADMIN-001",
      username: "Admin Koperasi",
      email: "admin@simpul.id",
      roles: ["ADMIN"],
      menus: [],
      isAdmin: true,
      statusRegistrasi: "DISETUJUI",
    },
  },
];

export function findMockAccount(
  identifier: { nik?: string; email?: string },
  password: string,
): MockAccount | undefined {
  return MOCK_ACCOUNTS.find((acc) => {
    const matchesIdentity = identifier.email
      ? acc.email.toLowerCase() === identifier.email.trim().toLowerCase()
      : identifier.nik
        ? acc.nik === identifier.nik.trim()
        : false;
    return matchesIdentity && acc.password === password;
  });
}
