import { axiosPrivate } from "@/shared/lib/axios/private";
import { useUserStore } from "@/shared/stores/user-store";
import { queryOptions, useQuery } from "@tanstack/react-query";
import qs from "query-string";

type TApplicationQueryParams = {
  chiefOccupantId: string;
  page: number;
  limit: number;
};

const fetchData = (query: string) => {
  return axiosPrivate.get(`/application/read-many?${query}`);
};

const getApplicationsQueryOptions = ({
  params,
}: {
  params: TApplicationQueryParams;
}) => {
  const filteredQuery = qs.stringify(params, {
    skipNull: true,
    skipEmptyString: true,
  });
  return queryOptions({
    queryKey: ["co-application-list", filteredQuery],
    queryFn: () => fetchData(filteredQuery),
  });
};

export const useGetApplications = () => {
  const { user } = useUserStore();

  const filters: TApplicationQueryParams = {
    chiefOccupantId: user?._id ?? "",
    page: 1,
    limit: 100,
  };

  const reactQuery = useQuery({
    ...getApplicationsQueryOptions({ params: filters }),
  });

  return reactQuery;
};
