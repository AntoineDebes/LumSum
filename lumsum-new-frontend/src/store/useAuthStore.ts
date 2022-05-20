import create from "zustand";
import { persist } from "zustand/middleware";

export type AuthStore = {
  session: boolean;
  login: () => void;
  logout: () => void;
};

const useAuthStore = create<AuthStore>(
  persist(
    (set, get) => ({
      session: false,
      login: () => set({ session: true }),
      logout: () => set({ session: false }),
    }),
    {
      name: "session",
    }
  )
);

export default useAuthStore;
