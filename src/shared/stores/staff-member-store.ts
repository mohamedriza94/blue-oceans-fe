import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TStaffMember = {
  _id: string;
  email: string;
  fullName: string;
  avatar: string;
  roles: string[];
  status: "active" | "inactive" | "suspended";
  twoFactorAuthEnabled: boolean;
};

type TStaffMemberStore = {
  staffMember: TStaffMember | null;
  setStaffMember: (staffMember: TStaffMember) => void;
  clearStaffMember: () => void;
};

export const useStaffMemberStore = create<TStaffMemberStore>()(
  persist(
    (set) => ({
      staffMember: null,
      setStaffMember: (staffMember: TStaffMember) => set({ staffMember }),
      clearStaffMember: () => set({ staffMember: null }),
    }),
    {
      name: "staff-member",
    },
  ),
);
