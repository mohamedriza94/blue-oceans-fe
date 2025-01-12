import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation } from "@tanstack/react-query";
import { TCategory } from "../../types/category";

const createCategoryPostFn = async (data: Partial<TCategory>) => {
  const response = await axiosPrivate.post("/category/create-category", data);
  return response.data;
};

export const useCreateCategoryApi = () => {
  const mutation = useMutation({
    mutationFn: createCategoryPostFn,
    retry: 1,
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-center" });
    },
  });

  return mutation;
};
