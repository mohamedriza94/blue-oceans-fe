import { axiosPrivate } from "@/shared/lib/axios/private";
import { TImage } from "@/shared/types/image";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation } from "@tanstack/react-query";

export enum ENUMPaymentSchedule {
  Monthly = "Monthly",
  Quarterly = "Quarterly",
  Annually = "Annually",
}

export enum ENUMLeaseStatus {
  Active = "Active",
  Terminated = "Terminated",
  Expired = "Expired",
}

export type TLeasePayload = {
  apartmentId: string;
  chiefOccupantId: string;
  startDate: Date;
  endDate: Date;
  rentAmountInUSD: number;
  paymentSchedule: ENUMPaymentSchedule;
  status: ENUMLeaseStatus;
  securityDepositInUSD: number;
  termsAndConditions: string;
  documentURLs?: TImage[];
};

const postFn = async (data: Partial<TLeasePayload>) => {
  const response = await axiosPrivate.post("/lease/create", data);
  return response.data;
};

export const useCreateLeaseApi = () => {
  const mutation = useMutation({
    mutationFn: postFn,
    retry: 1,
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-center" });
    },
  });

  return mutation;
};
