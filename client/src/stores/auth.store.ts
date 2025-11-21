import { create } from "zustand";

interface User {
  email: string;
  id: number;
}

interface AuthStoreState {
  isUserReady: boolean;
  user: User | null;
  isLoadingUser: boolean;
  setUser: (user: User) => void;
  setIsUserReady: (isUserReady: boolean) => void;
  setIsLoadingUser: (isLoadingUser: boolean) => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  isUserReady: false,
  user: null,
  isLoadingUser: true,
  setUser: (user: User) => set({ user }),
  setIsUserReady: (isUserReady: boolean) => set({ isUserReady }),
  setIsLoadingUser: (isLoadingUser: boolean) => set({ isLoadingUser }),
}));
