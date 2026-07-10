export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}
export interface Menu {
  id: string;
  name: string;
  url: string;
  icon: string;
  sequence: number;
  parentId: string | null;
}
export interface AuthUser {
  id: string;
  username: string;
  email: string;
  roles: string[];
  menus: Menu[];
}
export interface LoginPayload {
  nik?: string;
  email?: string;
  password: string;
}
export interface LoginResponse {
  user: AuthUser;
}
