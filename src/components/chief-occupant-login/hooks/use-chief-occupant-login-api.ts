import { axiosPublic } from "@/shared/lib/axios/public";
import { TChiefOccupantLoginPayload } from "./use-chief-occupant-login-form";
import { useMutation } from "@tanstack/react-query";
import { TReturnObj } from "@/shared/types/response";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useTokenStore } from "@/shared/stores/token-store";
import { useRouter } from "next/router";
import { protectedPaths } from "@/shared/constants/paths";
import { useUserStore } from "@/shared/stores/user-store";
import { useUserTypeStore } from "@/shared/stores/user-type-store";

const loginPostFn = async (data: TChiefOccupantLoginPayload) => {
  const response = await axiosPublic.post(
    "/authentication/chief-occupant-login",
    data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const useChiefOccupantLoginApi = () => {
  const router = useRouter();

  const { setAccessToken } = useTokenStore();
  const { setUserType } = useUserTypeStore();
  const { setUser } = useUserStore();

  const mutation = useMutation({
    mutationFn: loginPostFn,
    retry: 1,
    onSuccess: (response: TReturnObj) => {
      setAccessToken(response.data.jwt.accessToken);
      setUser(response.data.chiefOccupant);
      setUserType("chief-occupant");

      // Redirect
      const redirectPath = router.query.redirect as string;
      router.push(redirectPath || protectedPaths.co_dashboard.path);
    },
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios");
    },
  });

  return mutation;
};
