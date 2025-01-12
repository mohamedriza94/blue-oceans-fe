import { notifications } from "@mantine/notifications";
import { NotificationProps } from "@mantine/core";

export const ShowErrors = (
  error: string[] | any,
  errorType: "other" | "react-query-axios" = "other",
  notificationProps: NotificationProps | any = {},
) => {
  const errorList =
    errorType === "react-query-axios"
      ? (error.response?.data?.message ?? ["An unexpected error occurred"])
      : Array.isArray(error)
        ? error
        : ["An unexpected error occurred"];

  errorList.forEach((text: string) => {
    notifications.show({
      withCloseButton: true,
      withBorder: false,
      radius: "sm",
      color: "amaranthRed.7",
      message: text,
      ...notificationProps,
    });
  });
};
