import { useEffect } from "react";
import { useRouter } from "next/router";
import { protectedPaths } from "@/shared/constants/paths";
import { useUserTypeStore } from "@/shared/stores/user-type-store";

export const useUserTypeRedirect = () => {
  const { pathname, push } = useRouter();
  const { userType } = useUserTypeStore();

  useEffect(() => {
    const isChiefOccupantPath = pathname.startsWith("/co/");
    const isAdminPath = !pathname.startsWith("/co/");

    if (userType === "chief-occupant" && !isChiefOccupantPath) {
      // Redirect chief occupant to "/co/dashboard" if accessing non-co paths
      push(protectedPaths.co_dashboard.path);
    } else if (userType === "admin" && isChiefOccupantPath) {
      // Redirect admin to "dashboard" if accessing "co" paths
      push(protectedPaths.dashboard.path);
    }
  }, [pathname, userType, push]);
};
