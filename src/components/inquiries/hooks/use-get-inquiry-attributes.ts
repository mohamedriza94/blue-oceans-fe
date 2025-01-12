import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useQuery } from "@tanstack/react-query";

type TOptions = {
  statuses: string[];
  priorities: string[];
};

const fetchAttributes = async (): Promise<TOptions> => {
  const result = await axiosPrivate.get("/inquiry/load-attributes");
  return result.data;
};

const useGetAttributesQuery = () => {
  return useQuery({
    queryKey: ["get-inquiry-attributes"],
    queryFn: fetchAttributes,
  });
};

export const useGetInquiryAttributes = () => {
  const attributesQuery = useGetAttributesQuery();

  if (attributesQuery.isError) {
    ShowErrors(["Failed to fetch attributes. Try logging in again."]);
  }

  return { ...attributesQuery };
};
