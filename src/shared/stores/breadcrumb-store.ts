import { create } from "zustand";

export type TBreadcrumb = {
  icon?: string;
  label: string;
  href?: string;
};

type TBreadcrumbStore = {
  breadcrumbs: TBreadcrumb[];
  setBreadcrumbs: (breadcrumbs: TBreadcrumb[]) => void;
  addBreadcrumb: (breadcrumb: TBreadcrumb) => void;
  resetBreadcrumbs: () => void;
};

const useBreadcrumbStore = create<TBreadcrumbStore>((set) => ({
  breadcrumbs: [],
  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
  addBreadcrumb: (breadcrumb) =>
    set((state) => ({ breadcrumbs: [...state.breadcrumbs, breadcrumb] })),
  resetBreadcrumbs: () => set({ breadcrumbs: [] }),
}));

export default useBreadcrumbStore;
