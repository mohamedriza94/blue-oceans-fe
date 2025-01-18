import { useMutation } from "@tanstack/react-query";
import { ShowErrors } from "@/shared/utils/show-errors";
import { axiosPrivate } from "@/shared/lib/axios/private";

export enum ENUMExtRequest {
  Rejected = "Rejected",
  Approved = "Approved",
  Pending = "Pending",
}

export type TExtensionRequest = {
  leaseId?: string;
  requestedEndDate: Date;
  reason: string;
  status?: ENUMExtRequest;
  requestedAt?: Date;
};

const postFN = async (data: TExtensionRequest) => {
  const response = await axiosPrivate.post("/extension-request/create", data);
  return response.data;
};

export const useCreateExtensionRequestApi = () => {
  const mutation = useMutation({
    mutationFn: postFN,
    retry: 1,
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios");
    },
  });

  return mutation;
};
