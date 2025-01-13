import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation } from "@tanstack/react-query";
import { TChiefOccupantAddPayload } from "./use-add-chief-occupant-form";

const postFn = async (data: Partial<TChiefOccupantAddPayload>) => {
  const response = await axiosPrivate.post("/chief-occupant/create", data);
  return response.data;
};

export const useAddChiefOccupantApi = () => {
  const mutation = useMutation({
    mutationFn: postFn,
    retry: 1,
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-center" });
    },
  });

  return mutation;
};
