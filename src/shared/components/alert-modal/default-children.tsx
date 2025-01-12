import { Loader, rem, Stack, Text, ThemeIcon } from "@mantine/core";
import { AlertModalProps } from "./modal";
import { getIcon } from "./get-icon-fn";
import { getBGColor } from "./get-bg-color-fn";

export const DefaultChildren = ({
  type,
  isLoading,
  headerText,
  subtext,
}: {
  type: AlertModalProps["type"];
  isLoading: AlertModalProps["isLoading"];
  headerText?: string;
  subtext?: string;
}) => {
  let headerTextDefault: string;

  switch (type) {
    case "success":
      headerTextDefault = "Successful!";
      break;
    case "error":
      headerTextDefault = "Something went wrong!";
      break;
    case "warning":
      headerTextDefault = "Please be cautious!";
      break;
    case "info":
      headerTextDefault = "Here is some information.";
      break;
    default:
      headerTextDefault = "Alert!";
  }

  // ================================================================

  return (
    <Stack align="center" justify="center" gap={"sm"}>
      <ThemeIcon
        radius={100}
        size={80}
        style={{
          backgroundColor: getBGColor(type),
          color: "white",
        }}
      >
        {isLoading ? (
          <Loader color="#FFFFFF" type="dots" size={"md"} />
        ) : (
          getIcon(type)
        )}
      </ThemeIcon>

      <Stack gap={rem(5)}>
        <Text fw={600} fz="lg" ta="center">
          {headerText ?? headerTextDefault}
        </Text>

        {subtext ? (
          <Text fw={400} fz="sm" ta="center" c={"gray.6"}>
            {subtext}
          </Text>
        ) : (
          ""
        )}
      </Stack>
    </Stack>
  );
};
