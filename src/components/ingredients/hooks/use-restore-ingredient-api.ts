import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { TIngredient } from "../types/ingredient";
import { TReturnObj } from "@/shared/types/response";

const restoreIngredientPutFn = async (ingredientIDs: TIngredient["_id"][]) => {
  const response = await axiosPrivate.put(
    `/ingredient/delete-or-restore-ingredients`,
    { ingredientIDs, updateType: "restore" },
  );
  return response.data;
};

type useRestoreIngredientApiParams = {
  closeModal?: () => void;
};

export const useRestoreIngredientApi = ({
  closeModal,
}: useRestoreIngredientApiParams) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: restoreIngredientPutFn,
    retry: 1,
    onSuccess: (response: TReturnObj) => {
      queryClient.invalidateQueries({ queryKey: ["ingredients-list"] });

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
