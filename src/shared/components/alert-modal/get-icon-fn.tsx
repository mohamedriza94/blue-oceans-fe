import {
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiErrorWarningLine,
  RiInformationLine,
} from "@remixicon/react";

import { AlertModalProps } from "./modal";

export const getIcon = (type: AlertModalProps["type"]) => {
  let icon: React.ReactNode;
  const iconSize: string = "100%";

  switch (type) {
    case "success":
      icon = <RiCheckboxCircleLine size={iconSize} color="#FFFFFF" />;
      break;
    case "error":
      icon = <RiCloseCircleLine size={iconSize} color="#FFFFFF" />;
      break;
    case "warning":
      icon = <RiErrorWarningLine size={iconSize} color="#FFFFFF" />;
      break;
    case "info":
      icon = <RiInformationLine size={iconSize} color="#FFFFFF" />;
      break;
    default:
      icon = null;
  }

  return icon;
};
