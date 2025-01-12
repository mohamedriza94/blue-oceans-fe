import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation } from "@tanstack/react-query";
import { TCategoryUpdate } from "./use-edit-category-form";

const editCategoryPostFn = async ({
  _id,
  ...restData
}: Partial<TCategoryUpdate>) => {
  console.log("rest", restData);
  const response = await axiosPrivate.put(
    `/category/update-category/${_id}`,
    restData,
  );
  return response.data;
};

export const useEditCategoryApi = () => {
  const mutation = useMutation({
    mutationFn: editCategoryPostFn,
    retry: 1,
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-center" });
    },
  });

  return mutation;
};
