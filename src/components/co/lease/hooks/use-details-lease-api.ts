import { TLeaseAgreementData } from "@/components/lease/hooks/create-lease/lease-agreement";
import { axiosPrivate } from "@/shared/lib/axios/private";
import { useUserStore } from "@/shared/stores/user-store";
import { queryOptions, useQuery } from "@tanstack/react-query";

const fetchData = (
  chiefOccupantId: string,
): Promise<{ data: { data: TLeaseAgreementData } }> => {
  return axiosPrivate.get(
    `/lease/read-detailed-occupant-lease/${chiefOccupantId}`,
  );
};

const getDetailsLeaseQueryOptions = (chiefOccupantId: string) => {
  return queryOptions({
    queryKey: ["read-detailed-occupant-lease", chiefOccupantId],
    queryFn: () => fetchData(chiefOccupantId),
  });
};

export const useGetDetailsLease = () => {
  const { user } = useUserStore();

  const reactQuery = useQuery({
    ...getDetailsLeaseQueryOptions(user?._id ?? ""),
  });

  return {
    ...reactQuery,
  };
};
