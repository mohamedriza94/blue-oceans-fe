import { getIconComponent } from "@/shared/utils/dynamic-render-remix-icons";
import { NavLink, rem, Stack, Tooltip } from "@mantine/core";
import { useRouter } from "next/router";
import Link from "next/link";
import { protectedPaths } from "@/shared/constants/paths";

type MenuItemsListProps = {
  isMinimized: boolean;
};

export const MenuItemsList = ({ isMinimized }: MenuItemsListProps) => {
  const { pathname } = useRouter();

  const renderMenuItems = () => {
    return Object.values(protectedPaths).map((menuItem, index) => {
      const isActive = pathname === menuItem.path;

      const activeColor = isActive
        ? "var(--mantine-color-blue-5)"
        : "var(--mantine-color-darkBrown-6)";

      return (
        <Tooltip
          label={menuItem.name}
          key={`${menuItem.name}-${index}`}
          position="right-end"
          className="menu-items-custom-class"
        >
          <NavLink
            c={activeColor}
            color="blue.6"
            fw={600}
            component={Link}
            active={isActive}
            defaultOpened={isActive}
            passHref
            href={menuItem.path}
            label={isMinimized ? "" : menuItem.name}
            childrenOffset={15}
            style={{
              borderRadius: rem(5),
            }}
            leftSection={getIconComponent(menuItem.icon, {
              color: activeColor,
              size: 20,
            })}
          ></NavLink>
        </Tooltip>
      );
    });
  };

  return (
    <Stack align="stretch" justify="flex-start" gap={rem(5)}>
      {renderMenuItems()}
    </Stack>
  );
};
