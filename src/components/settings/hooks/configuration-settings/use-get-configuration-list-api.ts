import { axiosPrivate } from "@/shared/lib/axios/private";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export type TSiteConfiguration = {
  _id: string;
  keyName: string;
  keySlug: string;
  dataType:
    | "boolean"
    | "string"
    | "number"
    | "array"
    | "object"
    | "date"
    | "null";
  value: any;
  description?: string;
  updatedAt?: Date;
};

const fetchSiteConfig = async (): Promise<{
  data: { configurations: TSiteConfiguration[] };
}> => {
  const response = await axiosPrivate.get("/site-configuration/read-many");
  return response.data;
};

const getSiteConfigQueryOptions = () => {
  return {
    queryKey: ["site-configuration-list"],
    queryFn: fetchSiteConfig,
    staleTime: 3600000,
  };
};

export const useGetSiteConfig = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    ...getSiteConfigQueryOptions(),
  });

  const refreshConfig = () => {
    queryClient.invalidateQueries({ queryKey: ["site-configuration-list"] });
  };

  return {
    ...query,
    refreshConfig,
  };
};
