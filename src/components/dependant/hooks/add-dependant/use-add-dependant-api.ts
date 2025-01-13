import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation } from "@tanstack/react-query";
import { TDependentPayload } from "./use-add-dependant-form";

const postFn = async (data: Partial<TDependentPayload>) => {
  const response = await axiosPrivate.post("/dependant/create", data);
  return response.data;
};

export const useAddDependantApi = () => {
  const mutation = useMutation({
    mutationFn: postFn,
    retry: 1,
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-center" });
    },
  });

  return mutation;
};
