import { axiosPrivate } from "@/shared/lib/axios/private";
import { queryOptions, useQuery } from "@tanstack/react-query";

export enum ENUMRentPaymentStatus {
  Pending = "Pending",
  Paid = "Paid",
  Overdue = "Overdue",
}

export type TRent = {
  _id?: string;
  leaseId: string;
  dueDate: Date;
  penaltyAmount?: number;
  amount: number;
  paymentStatus: ENUMRentPaymentStatus;
  paymentDate?: Date;
  remarks?: string;
  paymentIntentId?: string;
  clientSecret?: string;
};

const fetchData = (leaseId: string): Promise<{ data: { data: TRent[] } }> => {
  return axiosPrivate.get(`/lease/read-rents-of-lease/${leaseId}`);
};

const getRentsOfLeaseQueryOptions = (leaseId: string) => {
  return queryOptions({
    queryKey: ["rents-of-lease", leaseId],
    queryFn: () => fetchData(leaseId),
  });
};

export const useRentsOfLease = (leaseId: string) => {
  const reactQuery = useQuery({
    ...getRentsOfLeaseQueryOptions(leaseId),
  });

  return {
    ...reactQuery,
  };
};
