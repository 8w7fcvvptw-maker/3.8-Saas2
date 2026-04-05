import type { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  session: Session | null;
  initialized: boolean;
  setAuth: (user: User | null, session: Session | null) => void;
  setInitialized: (v: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  initialized: false,
  setAuth: (user, session) => set({ user, session }),
  setInitialized: (initialized) => set({ initialized }),
}));
