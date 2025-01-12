import { useMutation } from "@tanstack/react-query";
import { ShowErrors } from "@/shared/utils/show-errors";
import { axiosPrivate } from "@/shared/lib/axios/private";
import { TBuildingWithoutParkingSlots } from "./use-update-building-form";

const postFN = async (data: TBuildingWithoutParkingSlots) => {
  const { _id, ...restPayload } = data;

  const response = await axiosPrivate.put(
    `/building/update-building/${_id}`,
    restPayload,
  );
  return response.data;
};

export const useUpdateBuildingApi = () => {
  const mutation = useMutation({
    mutationFn: postFN,
    retry: 1,
    onError: (error: any) => {
      console.log('error', error)
      ShowErrors(error, "react-query-axios");
    },
  });

  return mutation;
};
