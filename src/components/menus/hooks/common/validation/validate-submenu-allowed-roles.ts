import { notifications } from "@mantine/notifications";
import { FormValues } from "../../create-menu/use-create-menu-form";

export const validateSubmenuAllowedRoles = (
  values: FormValues,
  parentIndex = "",
) => {
  const submenus = values.submenus ?? [];
  const allowedRoles = values.allowedRoles ?? [];
  for (let i = 0; i < submenus.length; i++) {
    const submenu = submenus[i];
    const currentIndex = parentIndex ? `${parentIndex}.${i + 1}` : `${i + 1}`;

    for (const role of submenu.allowedRoles) {
      if (!allowedRoles.includes(role)) {
        notifications.show({
          color: "amaranthRed.5",
          message: null,
          title: `Role "${role}" in submenu #${currentIndex} must exist in the parent's allowed roles.`,
          position: "top-right",
        });
        return false;
      }
    }
    // Recursively validate nested submenus
    if (!validateSubmenuAllowedRoles(submenu, currentIndex)) return false;
  }
  return true;
};
