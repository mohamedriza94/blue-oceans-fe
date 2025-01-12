import { ZOD_menuItemSchema } from "@/components/menus/hooks/common/zod-schema";
import { z } from "zod";
import { useCreateMenuItemApi } from "./use-create-menu-api";
import { TMenuItem } from "../../types/menu-item";
import { useForm, zodResolver } from "@mantine/form";
import { useAlertModal } from "@/shared/components/alert-modal/use-alert-modal";
import { validateSubmenuAllowedRoles } from "../common/validation/validate-submenu-allowed-roles";
import { validateSubmenuDisplayPositions } from "../common/validation/validate-submenu-display-positions";
import { addSubmenu, removeSubmenu } from "../common/handle-sub-menu";

export type FormValues = z.infer<typeof ZOD_menuItemSchema>;

export const useCreateMenuItemForm = () => {
  const showAlert = useAlertModal();
  const { mutate, ...createMenuItemApiData } = useCreateMenuItemApi();

  const initialValues = {
    label: "",
    description: "",
    displayPosition: 0,
    href: "",
    allowedRoles: [],
    icon: "",
    isActive: false,
    submenus: [],
  };

  const form = useForm<TMenuItem>({
    initialValues,
    validate: zodResolver(ZOD_menuItemSchema),
  });

  const handleSubmit = async (values: FormValues) => {
    if (!validateSubmenuAllowedRoles(values)) return;
    if (!validateSubmenuDisplayPositions(values)) return;

    mutate(values, {
      onSuccess: () => {
        form.reset();

        showAlert({
          type: "success",
          defaultChildrenTexts: {
            headerText: "Created",
            subtext: "Menu Item Created Successfully",
          },
          showCloseButton: false,
        });
      },
    });
  };

  return {
    form,
    addSubmenu: (index: number | null | undefined) =>
      addSubmenu(form, "submenus", initialValues, index),
    removeSubmenu: (index: number) => removeSubmenu(form, "submenus", index),
    handleSubmit,
    ...createMenuItemApiData,
  };
};
