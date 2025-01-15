import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation } from "@tanstack/react-query";

export type TPayRent = {
  rentId: string;
  remarks?: string;
};

const postFN = async (payload: Partial<TPayRent>) => {
  const response = await axiosPrivate.put(`/lease/pay-rent`, payload);
  return response.data;
};

export const usePayRentApi = () => {
  const mutation = useMutation({
    mutationFn: postFN,
    retry: 1,
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-center" });
    },
  });

  return mutation;
};
