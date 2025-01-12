import { axiosPrivate } from "@/shared/lib/axios/private";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { TCategory } from "../types/category";

type TCategoryPayload = {
  id: TCategory["_id"] | null;
  displayFields?: string[];
  getType?: "one" | "children";
  includeDeleted?: boolean;
};

const fetchData = async ({
  id,
  ...payload
}: TCategoryPayload): Promise<TCategory | null> => {
  const result = await axiosPrivate.post(
    `/category/read-one-category/${id}`,
    payload,
  );
  return result.data?.data;
};

export const getOneCategoryQueryOptions = (payload: TCategoryPayload) => {
  return queryOptions({
    queryKey: ["category", payload],
    queryFn: () => fetchData(payload),
    staleTime: 0,
    retry: 1,
    enabled: !!payload.id,
  });
};

export const useGetOneCategory = (payload: TCategoryPayload) => {
  const reactQuery = useQuery({
    ...getOneCategoryQueryOptions(payload),
  });

  return reactQuery;
};
