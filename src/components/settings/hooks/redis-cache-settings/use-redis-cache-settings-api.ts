import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShowErrors } from "@/shared/utils/show-errors";
import { axiosPrivate } from "@/shared/lib/axios/private";
import { TReturnObj } from "@/shared/types/response";
import { notifications } from "@mantine/notifications";

const clearRedisCacheFn = async () => {
  const response = await axiosPrivate.get("/settings/redis/clear-redis-cache");
  return response.data;
};

export const useRedisCacheSettingsApi = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: clearRedisCacheFn,
    retry: 1,
    onError: (error: TReturnObj) => {
      ShowErrors(error, "react-query-axios");
    },
    onSuccess: (response: TReturnObj) => {
      queryClient.invalidateQueries();
      
      notifications.show({
        color: "green.4",
        message: response.message[0],
        position: "top-right",
      });
    },
  });

  return mutation;
};
