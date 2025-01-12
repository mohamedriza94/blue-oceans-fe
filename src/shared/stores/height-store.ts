import { create } from "zustand";

type THeight = {
  height: number;
  setHeight: (height: number) => void;
};

export const useHeight = create<THeight>((set) => ({
  height: 0,
  setHeight: (height) => set({ height }),
}));
