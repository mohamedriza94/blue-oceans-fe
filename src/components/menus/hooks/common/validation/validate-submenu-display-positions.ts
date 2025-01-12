import { notifications } from "@mantine/notifications";
import { FormValues } from "../../create-menu/use-create-menu-form";

export const validateSubmenuDisplayPositions = (values: FormValues) => {
  const submenus = values.submenus ?? [];
  const displayPositions = submenus.map((submenu) => submenu.displayPosition);
  const uniquePositions = new Set(displayPositions);

  if (displayPositions.length !== uniquePositions.size) {
    notifications.show({
      color: "amaranthRed.5",
      message: null,
      title: `Submenus under must have unique display positions.`,
      position: "top-right",
    });
    return false;
  }

  const sortedPositions = [...displayPositions].sort((a, b) => a - b);
  for (let i = 0; i < sortedPositions.length; i++) {
    if (sortedPositions[i] !== i + 1) {
      notifications.show({
        color: "amaranthRed.5",
        message: null,
        title: `Display positions must be sequential starting from 1.`,
        position: "top-right",
      });
      return false;
    }
  }

  for (let i = 0; i < submenus.length; i++) {
    const submenu = submenus[i];
    if (!validateSubmenuDisplayPositions(submenu)) return false;
  }

  return true;
};
