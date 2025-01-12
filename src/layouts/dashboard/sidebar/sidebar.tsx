import { currentYear } from "@/shared/constants/general";
import { rem, Stack, Text } from "@mantine/core";
import { MenuItemsContainer } from "./menu-items/menu-items-container";

type DashboardSidebarProps = {
  isMinimized: boolean;
};

export const DashboardSidebar = ({ isMinimized }: DashboardSidebarProps) => {
  return (
    <Stack
      justify="space-between"
      align="stretch"
      gap={"xs"}
      px={"xs"}
      h={"100%"}
      pt={rem(10)}
      pb={rem(4)}
      pos={"relative"}
    >
      <MenuItemsContainer isMinimized={isMinimized} />

      {/* Footer */}
      {isMinimized ? (
        ""
      ) : (
        <Text fw={500} fz={rem(10)} ta={"center"}>
          &copy; {currentYear} {"Blue Oceans. All Rights Reserved"}
        </Text>
      )}
    </Stack>
  );
};
