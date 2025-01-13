import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation } from "@tanstack/react-query";
import { TDependantUpdate } from "./use-edit-dependant-form";

const postFn = async (data: Partial<TDependantUpdate>) => {
  const { _id, ...restPayload } = data;

  const response = await axiosPrivate.put(
    `/dependant/update/${_id}`,
    restPayload,
  );
  return response.data;
};

export const useUpdateDependantApi = () => {
  const mutation = useMutation({
    mutationFn: postFn,
    retry: 1,
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-center" });
    },
  });

  return mutation;
};
