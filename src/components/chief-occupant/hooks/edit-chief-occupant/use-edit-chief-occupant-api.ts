import { useMutation } from "@tanstack/react-query";
import { ShowErrors } from "@/shared/utils/show-errors";
import { axiosPrivate } from "@/shared/lib/axios/private";
import { TChiefOccupantUpdate } from "./use-edit-chief-occupant-form";

const postFN = async (data: Partial<TChiefOccupantUpdate>) => {
  const { _id, ...restPayload } = data;

  const response = await axiosPrivate.put(
    `/chief-occupant/update/${_id}`,
    restPayload,
  );
  return response.data;
};

export const useUpdateChiefOccupantApi = () => {
  const mutation = useMutation({
    mutationFn: postFN,
    retry: 1,
    onError: (error: any) => {
      console.log("error", error);
      ShowErrors(error, "react-query-axios");
    },
  });

  return mutation;
};
