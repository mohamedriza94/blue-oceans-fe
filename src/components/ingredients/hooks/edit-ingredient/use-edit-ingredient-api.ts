import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation } from "@tanstack/react-query";
import { TIngredientUpdate } from "./use-edit-ingredient-form";

const editIngredientPostFn = async ({
  _id,
  ...restData
}: Partial<TIngredientUpdate>) => {
  const response = await axiosPrivate.put(
    `/ingredient/update-ingredient/${_id}`,
    restData,
  );
  return response.data;
};

export const useEditIngredientApi = () => {
  const mutation = useMutation({
    mutationFn: editIngredientPostFn,
    retry: 1,
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-center" });
    },
  });

  return mutation;
};
