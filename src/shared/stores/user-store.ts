import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TUser = {
  _id: string;
  email: string;
  fullName: string;
};

type TUserStore = {
  user: TUser | null;
  setUser: (user: TUser) => void;
  clearUser: () => void;
};

export const useUserStore = create<TUserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: TUser) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user",
    },
  ),
);
