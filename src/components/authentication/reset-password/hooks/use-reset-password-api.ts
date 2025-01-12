import { axiosPublic } from "@/shared/lib/axios/public";
import { useMutation } from "@tanstack/react-query";
import { ShowErrors } from "@/shared/utils/show-errors";
import { TResetPasswordPayload } from "./use-reset-password-form";

const resetPasswordPostFn = async (data: TResetPasswordPayload) => {
  const response = await axiosPublic.post(
    "/reset-password/reset-password-via-link",
    data,
  );
  return response.data;
};

export const useResetPasswordApi = () => {
  const mutation = useMutation({
    mutationFn: resetPasswordPostFn,
    retry: 1,
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios");
    },
  });

  return mutation;
};
