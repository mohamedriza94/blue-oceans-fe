import { z } from "zod";
import { TIngredient } from "../../types/ingredient";

export const ZOD_ingredientSchema: z.ZodType<Partial<TIngredient>> = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  shortDescription: z.string().min(1, "Short description is required"),
  nutritionalInfo: z
    .array(
      z.object({
        nutrition: z.string().min(1, "Nutrition name is required"),
        count: z.number().nonnegative("Count must be a positive number"),
        unit: z.string().min(1),
      }),
    )
    .optional(),
  seo: z
    .object({
      title: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    })
    .optional(),
  isActive: z.boolean().default(true),
});
