import { axiosPrivate } from "@/shared/lib/axios/private";
import { useTokenStore } from "@/shared/stores/token-store";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useQuery } from "@tanstack/react-query";

export type IMenuItem = {
  label: string;
  slug: string;
  description?: string;
  href: string;
  icon?: string;
  color?: string;
  customStyles?: string;
  allowedRoles?: string[];
  displayPosition: number;
  isActive?: boolean;
  submenus?: IMenuItem[];
};

const fetchMenuItemsByRole = async (): Promise<{
  data: { menuItems: IMenuItem[] };
}> => {
  return axiosPrivate.get("/menu-item/read-menu-items-on-role-basis");
};

const useMenuItemsByRoleQuery = () => {
  const { accessToken } = useTokenStore();

  return useQuery({
    queryKey: ["menu-items-by-role", accessToken],
    queryFn: fetchMenuItemsByRole,
    staleTime: Infinity,
    select: (data) => data.data.menuItems || [],
  });
};

export const useMenuItemsByRole = () => {
  const menuItemsQuery = useMenuItemsByRoleQuery();

  if (menuItemsQuery.isError) {
    ShowErrors([
      "Failed to fetch menu items at this time. Try logging in again.",
    ]);
  }

  return { ...menuItemsQuery };
};
