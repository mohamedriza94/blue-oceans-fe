import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { TReturnObj } from "@/shared/types/response";
import { TCategory } from "../types/category";

type TUpdateCategoryStatusParams = {
  categoryIDs: TCategory["_id"][];
};

const updateCategoryStatusFn = async ({
  categoryIDs,
}: TUpdateCategoryStatusParams) => {
  const response = await axiosPrivate.put(
    `/category/activate-or-deactivate-categories`,
    { categoryIDs },
  );
  return response.data;
};

export const useUpdateCategoryStatusApi = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateCategoryStatusFn,
    retry: 1,
    onSuccess: (response: TReturnObj) => {
      queryClient.invalidateQueries({ queryKey: ["categories-list"] });

      notifications.show({
        position: "top-center",
        message: response.message || "Status updated successfully",
        color: "green.4",
      });
    },
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-right" });
    },
  });

  return mutation;
};
