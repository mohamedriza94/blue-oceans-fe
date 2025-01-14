import { TChangePasswordPayload } from "./use-change-password-form";
import { useMutation } from "@tanstack/react-query";
import { ShowErrors } from "@/shared/utils/show-errors";
import { axiosPrivate } from "@/shared/lib/axios/private";

const changePasswordPostFn = async (data: TChangePasswordPayload) => {
  const response = await axiosPrivate.post(
    "/password/update-password",
    data,
  );
  return response.data;
};

export const useChangePasswordApi = () => {
  const mutation = useMutation({
    mutationFn: changePasswordPostFn,
    retry: 1,
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios");
    },
  });

  return mutation;
};
