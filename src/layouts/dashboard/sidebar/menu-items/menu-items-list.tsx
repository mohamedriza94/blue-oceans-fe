import { getIconComponent } from "@/shared/utils/dynamic-render-remix-icons";
import { IMenuItem } from "../hooks/use-get-menu-items-api";
import { NavLink, rem, Stack, Tooltip } from "@mantine/core";
import { useRouter } from "next/router";
import Link from "next/link";

type MenuItemsListProps = {
  isMinimized: boolean;
  items: IMenuItem[];
};

export const MenuItemsList = ({ isMinimized, items }: MenuItemsListProps) => {
  const { pathname } = useRouter();

  const renderMenuItems = (menuItems: IMenuItem[]) => {
    return menuItems.map((menuItem, index) => {
      const isActive =
        pathname === menuItem.href ||
        (menuItem.submenus &&
          menuItem.submenus.some((submenu) => pathname === submenu.href));

      const activeColor = isActive
        ? "var(--mantine-color-amaranthRed-5)"
        : "var(--mantine-color-darkBrown-6)";

      return (
        <Tooltip
          label={isMinimized ? menuItem.label : menuItem.description}
          key={`${menuItem.label}-${index}`}
          position="right-end"
          className="menu-items-custom-class"
        >
          <NavLink
            c={activeColor}
            color="amaranthRed.5"
            fw={600}
            component={Link}
            active={isActive}
            defaultOpened={isActive}
            passHref
            href={
              menuItem.submenus?.length ? "javascript:void(0)" : menuItem.href
            }
            label={isMinimized ? "" : menuItem.label}
            childrenOffset={15}
            style={{
              borderRadius: rem(5),
            }}
            leftSection={getIconComponent(menuItem.icon, {
              color: activeColor,
              size: 20,
            })}
            rightSection={
              menuItem.submenus?.length
                ? getIconComponent("RiArrowRightSLine", {
                    size: 18,
                    color: activeColor,
                  })
                : ""
            }
          >
            {menuItem.submenus?.length
              ? renderMenuItems(menuItem.submenus)
              : null}
          </NavLink>
        </Tooltip>
      );
    });
  };

  return (
    <Stack align="stretch" justify="flex-start" gap={rem(5)}>
      {renderMenuItems(items)}
    </Stack>
  );
};
