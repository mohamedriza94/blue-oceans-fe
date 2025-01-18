import { axiosPrivate } from "@/shared/lib/axios/private";
import { queryOptions, useQuery } from "@tanstack/react-query";

export type TDashboardCountData = {
  buildings: {
    total: number;
  };
  apartments: {
    total: number;
    occupied: number;
    available: number;
    maintenance: number;
  };
  chiefOccupants: {
    total: number;
    active: number;
    inactive: number;
  };
  leases: {
    total: number;
    active: number;
    expired: number;
    terminated: number;
  };
  extensionRequests: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
};

const fetchData = (): Promise<{
  data: { data: TDashboardCountData };
}> => {
  return axiosPrivate.get(`/dashboard/counts`);
};

const getDashboardQueryOptions = () => {
  return queryOptions({
    queryKey: ["admin-dashboard-count"],
    queryFn: () => fetchData(),
  });
};

export const useGetDashboardCount = () => {
  const reactQuery = useQuery({
    ...getDashboardQueryOptions(),
  });

  return {
    ...reactQuery,
  };
};
