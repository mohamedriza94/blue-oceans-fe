import { TMenuItem } from "@/components/menus/types/menu-item";
import { z } from "zod";

export const ZOD_menuItemSchema: z.ZodType<TMenuItem> = z.object({
  label: z.string().nonempty("Label is required."),
  description: z.string().optional(),
  href: z.string().nonempty("href cannot be empty."),
  icon: z.string().optional(),
  color: z.string().optional(),
  customStyles: z.string().optional(),
  allowedRoles: z.array(z.string()).refine((roles) => roles.length > 0, {
    message: "At least one role is required",
  }),
  displayPosition: z
    .number()
    .min(0, "Display position must be a non-negative number."),
  isActive: z.boolean(),
  submenus: z.array(z.lazy(() => ZOD_menuItemSchema)).optional(),
});
