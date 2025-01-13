import { useMutation } from "@tanstack/react-query";
import { ShowErrors } from "@/shared/utils/show-errors";
import { TBuildingPayload } from "./use-add-building-form";
import { axiosPrivate } from "@/shared/lib/axios/private";

const postFN = async (data: TBuildingPayload) => {
  const response = await axiosPrivate.post("/building/create-building", data);
  return response.data;
};

export const useAddBuildingApi = () => {
  const mutation = useMutation({
    mutationFn: postFN,
    retry: 1,
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios");
    },
  });

  return mutation;
};
