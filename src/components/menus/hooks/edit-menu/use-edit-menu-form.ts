import { ZOD_menuItemSchema } from "@/components/menus/hooks/common/zod-schema";
import { z } from "zod";
import { TMenuItem } from "../../types/menu-item";
import { useForm, zodResolver } from "@mantine/form";
import { useAlertModal } from "@/shared/components/alert-modal/use-alert-modal";
import { validateSubmenuAllowedRoles } from "../common/validation/validate-submenu-allowed-roles";
import { validateSubmenuDisplayPositions } from "../common/validation/validate-submenu-display-positions";
import { useEditMenuApi } from "./use-edit-menu-api";
import { addSubmenu, removeSubmenu } from "../common/handle-sub-menu";

export type FormValues = z.infer<typeof ZOD_menuItemSchema>;

type TEditMenuForm = {
  menu: TMenuItem;
  closeModal?: () => void;
};

export const useEditMenuItemForm = ({ menu, closeModal }: TEditMenuForm) => {
  const showAlert = useAlertModal();
  const { mutate, ...editMenuItemApiData } = useEditMenuApi();

  const initialValues = {
    label: menu.label,
    description: menu.description,
    displayPosition: menu.displayPosition,
    href: menu.href,
    allowedRoles: menu.allowedRoles,
    icon: menu.icon,
    isActive: menu.isActive,
    submenus: menu.submenus,
  };

  const form = useForm<TMenuItem>({
    initialValues,
    validate: zodResolver(ZOD_menuItemSchema),
  });

  const handleSubmit = async (values: FormValues) => {
    if (!validateSubmenuAllowedRoles(values)) return;
    if (!validateSubmenuDisplayPositions(values)) return;

    mutate(
      {
        menuId: menu._id,
        data: values,
      },
      {
        onSuccess: () => {
          form.reset();
          closeModal && closeModal();

          showAlert({
            type: "success",
            defaultChildrenTexts: {
              headerText: "Updated",
              subtext: "Menu Item Updated Successfully",
            },
            showCloseButton: false,
          });
        },
      },
    );
  };

  return {
    form,
    addSubmenu: (index: number | null | undefined) =>
      addSubmenu(form, "submenus", initialValues, index),
    removeSubmenu: (index: number) => removeSubmenu(form, "submenus", index),
    handleSubmit,
    ...editMenuItemApiData,
  };
};
