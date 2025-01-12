import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type TActivate2FAPayload = {
  otp: string;
};

const activate2FAFn = async (data: TActivate2FAPayload) => {
  const response = await axiosPrivate.post(
    "/me/activate-2fa-after-authenticated",
    data,
  );
  return response.data;
};

export const useActivate2FAApi = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: activate2FAFn,
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-account-details"] });
    },
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-center" });
    },
  });

  return mutation;
};
