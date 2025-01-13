import { axiosPrivate } from "@/shared/lib/axios/private";
import { queryOptions, useQuery } from "@tanstack/react-query";

const fetchData = (chiefOccupantId: string) => {
  return axiosPrivate.get(`/dependant/read-many/${chiefOccupantId}`);
};

const getDependantsQueryOptions = (chiefOccupantId: string) => {
  return queryOptions({
    queryKey: ["dependants-list", chiefOccupantId],
    queryFn: () => fetchData(chiefOccupantId),
  });
};

export const useGetDependants = (chiefOccupantId: string) => {
  const reactQuery = useQuery({
    ...getDependantsQueryOptions(chiefOccupantId),
  });

  return {
    ...reactQuery,
  };
};
