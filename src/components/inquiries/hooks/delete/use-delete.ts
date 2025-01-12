import { useQueryClient } from "@tanstack/react-query";
import { useDeleteInquiriesApi } from "./use-delete-inquiries-api";
import { TInquiry } from "../../types/t";
import { notifications } from "@mantine/notifications";

export const useDelete = () => {
  const queryClient = useQueryClient();
  const { mutate, ...deleteInquiriesApiData } = useDeleteInquiriesApi();

  const handleDelete = (inquiryIDs: TInquiry["_id"][]) => {
    mutate(
      { inquiryIDs },
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

  return {
    handleDelete,
    ...deleteInquiriesApiData,
    isDeleting: deleteInquiriesApiData.isPending,
  };
};
