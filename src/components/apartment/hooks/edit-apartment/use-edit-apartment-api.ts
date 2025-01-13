import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation } from "@tanstack/react-query";
import { TApartmentUpdate } from "./use-edit-apartment-form";

const postFN = async ({ _id, ...restData }: Partial<TApartmentUpdate>) => {
  const response = await axiosPrivate.put(
    `/apartment/update-apartment/${_id}`,
    restData,
  );
  return response.data;
};

export const useEditApartmentApi = () => {
  const mutation = useMutation({
    mutationFn: postFN,
    retry: 1,
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-center" });
    },
  });

  return mutation;
};
