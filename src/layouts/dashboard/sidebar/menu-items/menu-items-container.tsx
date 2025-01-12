import { useMenuItemsByRole } from "../hooks/use-get-menu-items-api";
import { MenuItemsSkeleton } from "./menu-items-skeleton";
import { MenuItemsList } from "./menu-items-list";

import { Stack, Text } from "@mantine/core";
import { RiLockFill } from "@remixicon/react";

type MenuItemsProps = {
  isMinimized: boolean;
};

export const MenuItemsContainer = ({ isMinimized }: MenuItemsProps) => {
  const { data: menuItems, isLoading } = useMenuItemsByRole();

  return isLoading ? (
    <MenuItemsSkeleton />
  ) : !menuItems?.length ? (
    <Stack align="center" justify="center" gap={"xs"} flex={1}>
      <RiLockFill color="var(--mantine-color-amaranthRed-5)" />
      <Text fw={700} size="lg" c="amaranthRed.5" ta={'center'}>
        Access Denied
      </Text>
    </Stack>
  ) : (
    <MenuItemsList isMinimized={isMinimized} items={menuItems ?? []} />
  );
};
