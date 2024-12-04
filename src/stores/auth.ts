import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStore = {
  isAuthenticated: boolean;
  email: string;
  password: string;
  isAdmin: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      email: '',
      password: '',
      isAdmin: false,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setIsAdmin: (isAdmin) => set({ isAdmin }),
      logout: () => {
        localStorage.clear();
        window.location.reload();
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
