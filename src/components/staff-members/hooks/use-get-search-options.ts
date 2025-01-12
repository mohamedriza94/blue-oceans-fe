import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useQuery } from "@tanstack/react-query";

type TOptions = {
  statuses: string[];
  roles: string[];
};

const fetchOptions = async (): Promise<TOptions> => {
  const result = await axiosPrivate.get("/staff-member/load-search-options");
  return result.data;
};

const useGetSearchOptionsQuery = () => {
  return useQuery({
    queryKey: ["get-staff-member-search-options"],
    queryFn: fetchOptions,
    staleTime: Infinity,
  });
};

export const useStaffMemberSearchOptions = () => {
  const searchOptionsQuery = useGetSearchOptionsQuery();

  if (searchOptionsQuery.isError) {
    ShowErrors(["Failed to fetch search options. Try logging in again."]);
  }

  return { ...searchOptionsQuery };
};
