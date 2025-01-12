import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { TReturnObj } from "@/shared/types/response";
import { TCategory } from "../types/category";

const restoreCategoryPutFn = async (categoryIDs: TCategory["_id"][]) => {
  const response = await axiosPrivate.put(
    `/category/delete-or-restore-categories`,
    { categoryIDs, updateType: "restore" },
  );
  return response.data;
};

type useRestoreCategoryApiParams = {
  closeModal?: () => void;
};

export const useRestoreCategoryApi = ({
  closeModal,
}: useRestoreCategoryApiParams) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: restoreCategoryPutFn,
    retry: 1,
    onSuccess: (response: TReturnObj) => {
      queryClient.invalidateQueries({ queryKey: ["categories-list"] });

      notifications.show({
        position: "top-center",
        message: response.message || "Deleted",
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
