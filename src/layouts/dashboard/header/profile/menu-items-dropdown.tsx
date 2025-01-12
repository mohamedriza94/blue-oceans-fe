import { CustomMantineDrawer } from "@/shared/components/custom-mantine-drawer";
import { Menu } from "@mantine/core";
import {
  RiKey2Line,
  RiLogoutCircleLine,
  RiSettings3Line,
} from "@remixicon/react";
import { useState } from "react";
import { MyAccount } from "./menu-content/my-account";
import { ChangePassword } from "./menu-content/change-password";
import { useUserLogout } from "@/shared/hooks/use-user-logout";
import { useUserTypeStore } from "@/shared/stores/user-type-store";

type TMenuItem = {
  icon?: (color: string) => React.ReactNode;
  label?: string;
  onClick?: () => void;
  color?: string;
  isDivider?: boolean;
  hidden?: boolean;
};

type MenuItemsDropdownProps = {
  isDesktop: boolean;
};

export const MenuItemsDropdown = ({ isDesktop }: MenuItemsDropdownProps) => {
  const { performLogout } = useUserLogout();
  const { userType } = useUserTypeStore();

  // START : OPEN DRAWER CONTROLS
  const [drawerContent, setDrawerContent] = useState<React.ReactNode>(null);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const handleMenuItemClick = (content: React.ReactNode) => {
    setDrawerContent(content);
    setDrawerOpened(true);
  };
  // END : OPEN DRAWER CONTROLS

  const menuItems: TMenuItem[] = [
    {
      label: "My Account",
      color: "var(--mantine-color-darkBrown-6)",
      icon: (color) => <RiSettings3Line color={color} size={20} />,
      onClick: () => handleMenuItemClick(<MyAccount />),
      hidden: userType === "admin",
    },
    {
      label: "Change Password",
      color: "var(--mantine-color-darkBrown-6)",
      icon: (color) => <RiKey2Line color={color} size={20} />,
      onClick: () => handleMenuItemClick(<ChangePassword />),
      hidden: userType === "admin",
    },
    {
      label: "Logout",
      color: "var(--mantine-color-blue-6)",
      icon: (color) => <RiLogoutCircleLine color={color} size={20} />,
      onClick: performLogout,
    },
  ];

  return (
    <>
      <Menu.Dropdown>
        {menuItems.map((item, index) => {
          if (item.hidden) {
            return;
          }
          return (
            <Menu.Item
              key={index}
              leftSection={item.icon?.(item.color!)}
              color={item.color}
              onClick={item.onClick}
            >
              {item.label}
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>

      {/* Drawer */}
      <CustomMantineDrawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        radius={"lg"}
        position={isDesktop ? "right" : "bottom"}
        overlayProps={{ backgroundOpacity: 0.05, blur: 6 }}
        transitionProps={{
          transition: "pop-top-right",
          duration: 150,
          timingFunction: "linear",
        }}
        size={"auto"}
      >
        {drawerContent}
      </CustomMantineDrawer>
    </>
  );
};
