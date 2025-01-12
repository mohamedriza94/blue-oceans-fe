import { TDeletion } from "@/shared/types/deletion";
import { TImage } from "@/shared/types/image";
import { TTimestamp } from "@/shared/types/timestamp";

export type TNutritionalInfo = {
  nutrition: string;
  count: number;
  unit: string;
};

export type TIngredient = {
  _id?: string;
  name: string;
  slug?: string;
  description?: string;
  shortDescription: string;
  nutritionalInfo?: TNutritionalInfo[];
  images?: TImage[];
  seo?: {
    title?: string;
    keywords?: string[];
  };
  isActive: boolean;
} & TDeletion &
  TTimestamp;
