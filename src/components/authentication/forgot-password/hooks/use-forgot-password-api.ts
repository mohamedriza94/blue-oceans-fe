import { axiosPublic } from "@/shared/lib/axios/public";
import { useMutation } from "@tanstack/react-query";
import { ShowErrors } from "@/shared/utils/show-errors";
import { TForgotPasswordPayload } from "./use-forgot-password-form";

const forgotPasswordPostFn = async (data: TForgotPasswordPayload) => {
  const response = await axiosPublic.post(
    "/reset-password/verify-account",
    data,
  );
  return response.data;
};

export const useForgotPasswordApi = () => {
  const mutation = useMutation({
    mutationFn: forgotPasswordPostFn,
    retry: 1,
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios");
    },
  });

  return mutation;
};
