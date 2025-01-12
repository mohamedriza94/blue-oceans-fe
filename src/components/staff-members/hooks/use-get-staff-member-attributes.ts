import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useQuery } from "@tanstack/react-query";

type TOptions = {
  statuses: string[];
  roles: string[];
};

const fetchAttributes = async (): Promise<TOptions> => {
  const result = await axiosPrivate.get("/staff-member/load-attributes");
  return result.data;
};

const useGetAttributesQuery = () => {
  return useQuery({
    queryKey: ["get-staff-member-attributes"],
    queryFn: fetchAttributes,
  });
};

export const useGetStaffMemberAttributes = () => {
  const attributesQuery = useGetAttributesQuery();

  if (attributesQuery.isError) {
    ShowErrors(["Failed to fetch attributes. Try logging in again."]);
  }

  return { ...attributesQuery };
};
