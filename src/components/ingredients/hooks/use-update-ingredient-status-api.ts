import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { TIngredient } from "../types/ingredient";
import { TReturnObj } from "@/shared/types/response";

type TUpdateIngredientStatusParams = {
  ingredientIDs: TIngredient["_id"][];
};

const updateIngredientStatusFn = async ({
  ingredientIDs,
}: TUpdateIngredientStatusParams) => {
  const response = await axiosPrivate.put(
    `/ingredient/activate-or-deactivate-ingredients`,
    { ingredientIDs },
  );
  return response.data;
};

export const useUpdateIngredientStatusApi = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateIngredientStatusFn,
    retry: 1,
    onSuccess: (response: TReturnObj) => {
      queryClient.invalidateQueries({ queryKey: ["ingredients-list"] });

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
