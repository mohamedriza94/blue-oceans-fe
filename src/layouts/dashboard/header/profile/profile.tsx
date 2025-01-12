import { Box, Menu } from "@mantine/core";
import { MenuItemsDropdown } from "./menu-items-dropdown";
import { MenuTarget } from "./menu-target";
import { useDeviceType } from "@/shared/hooks/use-device-type";

export const Profile = () => {
  const { isDesktop } = useDeviceType();

  return (
    <Box ml={isDesktop ? "md" : ""}>
      <Menu
        shadow={"md"}
        withArrow
        transitionProps={{ transition: "pop-top-right", duration: 150 }}
      >
        <MenuTarget isDesktop={isDesktop ?? false} />
        <MenuItemsDropdown isDesktop={isDesktop ?? false} />
      </Menu>
    </Box>
  );
};
