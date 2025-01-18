import { axiosPrivate } from "@/shared/lib/axios/private";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { TExtensionRequestResponse } from "./use-read-extension-requests-api";

const fetchData = (
  extensionRequestId: string,
): Promise<{ data: { data: TExtensionRequestResponse } }> => {
  return axiosPrivate.get(`/extension-request/read-one/${extensionRequestId}`);
};

const getExtensionRequestQueryOptions = (extensionRequestId: string) => {
  return queryOptions({
    queryKey: ["extensionRequest", extensionRequestId],
    queryFn: () => fetchData(extensionRequestId),
  });
};

export const useGetOneExtensionRequest = (extensionRequestId: string) => {
  const reactQuery = useQuery({
    ...getExtensionRequestQueryOptions(extensionRequestId),
  });

  return {
    ...reactQuery,
  };
};
