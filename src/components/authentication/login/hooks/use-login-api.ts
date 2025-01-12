import { axiosPublic } from "@/shared/lib/axios/public";
import { TLoginPayload } from "./use-login-form";
import { useMutation } from "@tanstack/react-query";
import { TReturnObj } from "@/shared/types/response";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useTokenStore } from "@/shared/stores/token-store";
import { useStaffMemberStore } from "@/shared/stores/staff-member-store";
import { useRouter } from "next/router";
import { protectedPaths } from "@/shared/constants/paths";

const loginPostFn = async (data: TLoginPayload) => {
  const response = await axiosPublic.post("/authentication/staff-login", data, {
    withCredentials: true,
  });
  return response.data;
};

export const useLoginApi = () => {
  const router = useRouter();

  const { setAccessToken } = useTokenStore();
  const { setStaffMember } = useStaffMemberStore();

  const mutation = useMutation({
    mutationFn: loginPostFn,
    retry: 1,
    onSuccess: (response: TReturnObj) => {
      setAccessToken(response.data.jwt.accessToken);
      setStaffMember(response.data.staffMember);

      // Redirect
      const redirectPath = router.query.redirect as string;
      router.push(redirectPath || protectedPaths.dashboard);
    },
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios");
    },
  });

  return mutation;
};
