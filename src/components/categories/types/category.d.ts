import { TDeletion } from "@/shared/types/deletion";
import { TImage } from "@/shared/types/image";

export type TCategoryBase = {
  _id?: string;
  name: string;
  description?: string;
  shortDescription?: string;
  images?: TImage[];
  isActive: boolean;
} & TDeletion;

export type TCategory = {
  categoryHierarchy?: string;
  parentCategoryID?: string;
} & TCategoryBase;
