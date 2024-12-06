import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStore = {
  isAuthenticated: boolean;
  email: string;
  name: string;
  username: string;
  isAdmin: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setUsername: (username: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      email: '',
      name: '',
      username: '',
      isAdmin: false,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setEmail: (email) => set({ email }),
      setName: (name) => set({ name }),
      setUsername: (username) => set({ username }),
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
