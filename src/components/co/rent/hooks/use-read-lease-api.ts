import { axiosPrivate } from "@/shared/lib/axios/private";
import { useUserStore } from "@/shared/stores/user-store";
import { queryOptions, useQuery } from "@tanstack/react-query";

export type TOccupantLease = {
  _id: string;
  apartmentId: {
    _id: string;
    buildingId: string;
    telephone: string;
    description: string;
    identification: string;
    class: string;
    status: string;
    images: {
      url: string;
      alt: string;
      isDefault: boolean;
    }[];
  };
  chiefOccupantId: {
    _id: string;
    apartmentId: string;
    image: string;
    fullName: string;
    contactNumber: string;
    email: string;
    password: string;
    status: string;
    __v: number;
  };
  startDate: string; // ISO string
  endDate: string; // ISO string
  rentAmountInUSD: number;
  paymentSchedule: "Monthly" | "Quarterly" | "Yearly";
  status: "Active" | "Inactive" | "Terminated";
  securityDepositInUSD: number;
  termsAndConditions: string;
  documentURLs: {
    url: string;
    name: string;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
};

const fetchData = (
  chiefOccupantId: string,
): Promise<{ data: { data: TOccupantLease } }> => {
  return axiosPrivate.get(`/lease/get-occupant-lease/${chiefOccupantId}`);
};

const getOccupantLeaseQueryOptions = (chiefOccupantId: string) => {
  return queryOptions({
    queryKey: ["get-occupant-lease", chiefOccupantId],
    queryFn: () => fetchData(chiefOccupantId),
  });
};

export const useGetOccupantLease = () => {
  const { user } = useUserStore();

  const reactQuery = useQuery({
    ...getOccupantLeaseQueryOptions(user?._id ?? ""),
  });

  return {
    ...reactQuery,
  };
};
