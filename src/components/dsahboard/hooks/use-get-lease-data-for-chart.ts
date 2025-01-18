import { axiosPrivate } from "@/shared/lib/axios/private";
import { queryOptions, useQuery } from "@tanstack/react-query";

export type TLeaseChartDataItem = {
  month: string;
  leases: number;
};

const fetchData = (
  year: number,
): Promise<{
  data: { data: TLeaseChartDataItem[] };
}> => {
  return axiosPrivate.post(`/dashboard/lease-data-for-chart`, { year });
};

const getLoadLeasesForChartQueryOptions = (year: number) => {
  return queryOptions({
    queryKey: ["lease-data-for-chart"],
    queryFn: () => fetchData(year),
  });
};

export const useGetLoadLeasesForChart = (year: number) => {
  const reactQuery = useQuery({
    ...getLoadLeasesForChartQueryOptions(year),
  });

  return {
    ...reactQuery,
  };
};
