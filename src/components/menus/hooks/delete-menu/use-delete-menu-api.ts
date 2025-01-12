import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { TMenuItem } from "../../types/menu-item";

const deleteMenuItemPutFn = async (menuId: TMenuItem["_id"]) => {
  const response = await axiosPrivate.put(
    `/menu-item/delete-menu-item/${menuId}`,
    {
      deletionType: "soft",
    },
  );
  return response.data;
};

type useDeleteMenuItemApiParams = {
  closeModal?: () => void;
};

export const useDeleteMenuItemApi = ({
  closeModal,
}: useDeleteMenuItemApiParams) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteMenuItemPutFn,
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus-list"] });

      notifications.show({
        position: "top-center",
        message: "Deleted",
        color: "green.4",
      });

      closeModal && closeModal();
    },
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-right" });
    },
  });

  return mutation;
};
