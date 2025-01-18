import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const postFN = async (notificationId: string) => {
  const response = await axiosPrivate.put(
    `/notification/update/${notificationId}`,
  );
  return response.data;
};

export const useUpdateNotificationApi = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postFN,
    retry: 1,
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-center" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification-list"] });

      showNotification({
        message: "Marked as read",
        color: "green.5",
      });
    },
  });

  return mutation;
};
