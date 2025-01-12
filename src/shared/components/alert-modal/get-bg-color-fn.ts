import { AlertModalProps } from "./modal";

export const getBGColor = (type: AlertModalProps["type"]) => {
  let color: string;

  switch (type) {
    case "success":
      color = "var(--mantine-color-green-4)";
      break;
    case "error":
      color = "var(--mantine-color-lightRed-6)";
      break;
    case "warning":
      color = "var(--mantine-color-orange-6)";
      break;
    case "info":
      color = "var(--mantine-color-blue-6)";
      break;
    default:
      color = "var(--mantine-color-blue-6)";
  }

  return color;
};
