import { MenuItemsList } from "./menu-items-list";

type MenuItemsProps = {
  isMinimized: boolean;
};

export const MenuItemsContainer = ({ isMinimized }: MenuItemsProps) => {
  return <MenuItemsList isMinimized={isMinimized} />;
};
