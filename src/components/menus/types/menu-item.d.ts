import { TDeletion } from "@/shared/types/deletion";

export type TMenuItem = {
  _id?: string;
  label: string;
  slug?: string;
  description?: string;
  href: string;
  icon?: string; // React Remix Icons
  color?: string;
  customStyles?: string;
  allowedRoles?: string[];
  displayPosition: number;
  isActive?: boolean;
  submenus?: IMenuItem[];
} & TDeletion;
