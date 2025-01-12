import { useQueryClient } from "@tanstack/react-query";
import { useUpdateInquiriesApi } from "./use-update-inquiries-api";
import { TInquiry } from "../../types/t";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";

export const useUpdate = () => {
  const queryClient = useQueryClient();
  const { mutate, ...updateInquiriesApiData } = useUpdateInquiriesApi();

  const handleUpdate = (inquiries: Partial<TInquiry>[]) => {
    mutate(
      { inquiries },
      {
        onSuccess: (response) => {
          queryClient.invalidateQueries({ queryKey: ["inquiries-list"] });

          notifications.show({
            color: "green.4",
            message: "",
            title: response.message[0],
            position: "top-right",
          });
        },
      },
    );
  };

  // Show/Hide Loading Notification
  useEffect(() => {
    const updateNotificationId = "update-loading";

    if (updateInquiriesApiData.isPending) {
      notifications.show({
        id: updateNotificationId,
        loading: true,
        color: "blue.4",
        w: 250,
        title: "Updating Config",
        message: "",
        position: "top-center",
      });
    } else {
      notifications.hide(updateNotificationId);
    }
  }, [updateInquiriesApiData.isPending]);

  return {
    handleUpdate,
    ...updateInquiriesApiData,
    isUpdating: updateInquiriesApiData.isPending,
  };
};
