import { axiosPublic } from "@/shared/lib/axios/public";
import { TAdminLoginPayload } from "./use-admin-login-form";
import { useMutation } from "@tanstack/react-query";
import { TReturnObj } from "@/shared/types/response";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useTokenStore } from "@/shared/stores/token-store";
import { useRouter } from "next/router";
import { protectedPaths } from "@/shared/constants/paths";
import { useUserStore } from "@/shared/stores/user-store";
import { useUserTypeStore } from "@/shared/stores/user-type-store";

const loginPostFn = async (data: TAdminLoginPayload) => {
  const response = await axiosPublic.post("/authentication/admin-login", data, {
    withCredentials: true,
  });
  return response.data;
};

export const useAdminLoginApi = () => {
  const router = useRouter();

  const { setAccessToken } = useTokenStore();
  const { setUserType } = useUserTypeStore();
  const { setUser } = useUserStore();

  const mutation = useMutation({
    mutationFn: loginPostFn,
    retry: 1,
    onSuccess: (response: TReturnObj) => {
      setAccessToken(response.data.jwt.accessToken);
      setUser(response.data.admin);
      setUserType("admin");

      // Redirect
      const redirectPath = router.query.redirect as string;
      router.push(redirectPath || protectedPaths.dashboard.path);
    },
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios");
    },
  });

  return mutation;
};
