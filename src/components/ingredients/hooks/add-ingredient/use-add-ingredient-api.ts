import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation } from "@tanstack/react-query";
import { TIngredient } from "../../types/ingredient";

const addIngredientPostFn = async (data: Partial<TIngredient>) => {
  const response = await axiosPrivate.post(
    "/ingredient/create-ingredient",
    data,
  );
  return response.data;
};

export const useAddIngredientApi = () => {
  const mutation = useMutation({
    mutationFn: addIngredientPostFn,
    retry: 1,
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-center" });
    },
  });

  return mutation;
};
