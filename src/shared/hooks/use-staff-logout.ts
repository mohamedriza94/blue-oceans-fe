import { axiosPublic } from "@/shared/lib/axios/public";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useTokenStore } from "@/shared/stores/token-store";
import { useStaffMemberStore } from "@/shared/stores/staff-member-store";
import { useRouter } from "next/router";
import { unprotectedPaths } from "@/shared/constants/paths";

const staffLogoutPostFn = async () => {
  const response = await axiosPublic.post(
    "/authentication/staff-logout",
    {},
    { withCredentials: true },
  );
  return response.data;
};

export const useStaffLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { clearAccessToken } = useTokenStore();
  const { clearStaffMember } = useStaffMemberStore();

  const clearTanstackCache = () => {
    queryClient.removeQueries({
      queryKey: ["menu-items-on-role-basis"],
      exact: true,
    });
  };

  const mutation = useMutation({
    mutationFn: staffLogoutPostFn,
    retry: 1,
    onSuccess: () => {
      clearAccessToken();
      clearStaffMember();
      clearTanstackCache();
      router.push(unprotectedPaths.login);
    },
    onError: () => {
      ShowErrors(["Unable to Logout. Please Retry."]);
    },
  });

  const performLogout = () => {
    mutation.mutate();
  };

  return { performLogout, isLoading: mutation.isPending };
};
