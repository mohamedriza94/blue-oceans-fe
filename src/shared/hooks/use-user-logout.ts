import { useTokenStore } from "@/shared/stores/token-store";
import { useRouter } from "next/router";
import { unprotectedPaths } from "@/shared/constants/paths";
import { useUserStore } from "../stores/user-store";
import { useUserTypeStore } from "../stores/user-type-store";

export const useUserLogout = () => {
  const router = useRouter();
  const { clearAccessToken } = useTokenStore();
  const { clearUser } = useUserStore();
  const { clearUserType } = useUserTypeStore();

  const performLogout = () => {
    clearAccessToken();
    clearUser();
    clearUserType();
    router.push(unprotectedPaths.selectUser);
  };

  return { performLogout, isLoading: false };
};
