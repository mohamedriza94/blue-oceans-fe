import { TCategory } from "@/components/categories/types/category";
import { create } from "zustand";

type TParentCategoryID = {
  parentCategoryID: TCategory["parentCategoryID"] | null;
  setParentCategoryID: (parentCategoryID: string | null) => void;
};

export const useParentCategoryID = create<TParentCategoryID>((set) => ({
  parentCategoryID: null,
  setParentCategoryID: (parentCategoryID) => set({ parentCategoryID }),
}));
