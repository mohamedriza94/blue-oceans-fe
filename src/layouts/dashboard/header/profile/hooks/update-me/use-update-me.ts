import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type TUpdateMePayload = {
  twoFactorAuthEnabled?: boolean;
};

const updateMeFn = async (data: TUpdateMePayload) => {
  const response = await axiosPrivate.put("/me/update-account", data);
  return response.data;
};

const useUpdateMeApi = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateMeFn,
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-account-details"] });
    },
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios");
    },
  });

  return mutation;
};

export const useUpdateMeForm = () => {
  const updateMeApi = useUpdateMeApi();

  const handleSubmit = (data: TUpdateMePayload) => {
    if (data.twoFactorAuthEnabled) {
      delete data.twoFactorAuthEnabled;
      return;
    }

    updateMeApi.mutate(data);
  };

  return { handleSubmit, ...updateMeApi };
};
