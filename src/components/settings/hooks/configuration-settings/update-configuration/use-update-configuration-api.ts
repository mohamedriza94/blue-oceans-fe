import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShowErrors } from "@/shared/utils/show-errors";
import { axiosPrivate } from "@/shared/lib/axios/private";
import { TReturnObj } from "@/shared/types/response";
import { notifications } from "@mantine/notifications";
import { TSiteConfiguration } from "../use-get-configuration-list-api";
import { useEffect } from "react";

type TUpdateConfiguration = {
  configurationID: string;
  data: Partial<TSiteConfiguration>;
};

const updateConfigurationFn = async ({
  configurationID,
  data,
}: TUpdateConfiguration) => {
  const response = await axiosPrivate.put(
    `/site-configuration/update/${configurationID}`,
    data,
  );
  return response.data;
};

export const useUpdateConfigurationApi = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateConfigurationFn,
    retry: 1,
    onError: (error: TReturnObj) => {
      ShowErrors(error, "react-query-axios");
    },
    onSuccess: (response: TReturnObj) => {
      queryClient.invalidateQueries({ queryKey: ["site-configuration-list"] });

      notifications.show({
        color: "green.4",
        message: response.message[0],
        position: "top-right",
      });
    },
  });

  // Show/Hide Loading Notification
  useEffect(() => {
    const updateNotificationId = "update-loading";

    if (mutation.isPending) {
      notifications.show({
        id: updateNotificationId,
        loading: true,
        color: "blue.4",
        title: "Updating Config",
        message: "",
        position: "top-center",
      });
    } else {
      notifications.hide(updateNotificationId);
    }
  }, [mutation.isPending]);

  return mutation;
};
