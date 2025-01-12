import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TMenuItem } from "../../types/menu-item";
import { notifications } from "@mantine/notifications";

const restoreMenuItemPutFn = async (menuId: TMenuItem["_id"]) => {
  const response = await axiosPrivate.put(
    `/menu-item/restore-menu-item/${menuId}`,
    {},
  );
  return response.data;
};

type useRestoreMenuItemApiParams = {
  closeModal?: () => void;
};

export const useRestoreMenuItemApi = ({
  closeModal,
}: useRestoreMenuItemApiParams) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: restoreMenuItemPutFn,
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus-list"] });

      notifications.show({
        position: "top-center",
        message: "Restored",
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
