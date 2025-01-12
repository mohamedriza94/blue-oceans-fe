import { useMutation } from "@tanstack/react-query";
import { ShowErrors } from "@/shared/utils/show-errors";
import { axiosPrivate } from "@/shared/lib/axios/private";
import { TReturnObj } from "@/shared/types/response";
import { notifications } from "@mantine/notifications";

const flushOldTempFilesGetFn = async () => {
  const response = await axiosPrivate.get(
    "/settings/files/flush-old-temp-files",
  );
  return response.data;
};

export const useFlushOldTempFilesGetApi = () => {
  const mutation = useMutation({
    mutationFn: flushOldTempFilesGetFn,
    retry: 1,
    onError: (error: TReturnObj) => {
      ShowErrors(error, "react-query-axios");
    },
    onSuccess: (response: TReturnObj) => {
      notifications.show({
        color: "green.4",
        message: response.message[0],
        position: "top-right",
      });
    },
  });

  return mutation;
};
