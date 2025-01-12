import { z } from "zod";
import { TCategory } from "../../types/category";

export const ZOD_categorySchema: z.ZodType<Partial<TCategory>> = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  isActive: z.boolean().default(true),
  parentCategoryID: z.string().optional(),
});
