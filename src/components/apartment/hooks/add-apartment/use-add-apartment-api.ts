import { useMutation } from "@tanstack/react-query";
import { ShowErrors } from "@/shared/utils/show-errors";
import { axiosPrivate } from "@/shared/lib/axios/private";
import { TApartmentPayload } from "./use-add-apartment-form";

const postFN = async (data: TApartmentPayload) => {
  const response = await axiosPrivate.post("/apartment/create-apartment", data);
  return response.data;
};

export const useAddApartmentApi = () => {
  const mutation = useMutation({
    mutationFn: postFN,
    retry: 1,
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios");
    },
  });

  return mutation;
};
