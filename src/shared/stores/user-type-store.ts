import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserTypes = "chief-occupant" | "admin";

type TUserType = {
  userType: UserTypes | null;
  setUserType: (userType: UserTypes) => void;
  clearUserType: () => void;
};

export const useUserTypeStore = create<TUserType>()(
  persist(
    (set) => ({
      userType: null,
      setUserType: (userType) =>
        set(() => ({
          userType,
        })),
      clearUserType: () =>
        set(() => ({
          userType: null,
        })),
    }),
    {
      name: "user-type-store",
    },
  ),
);
