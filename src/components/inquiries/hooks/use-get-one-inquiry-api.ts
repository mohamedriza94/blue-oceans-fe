import { axiosPrivate } from "@/shared/lib/axios/private";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { TInquiry } from "../types/t";

type TInquiryId = TInquiry["_id"] | null;

const fetchData = async (id: TInquiryId): Promise<TInquiry | null> => {
  if (!id) return null;

  const result = await axiosPrivate.get(`/inquiry/read-one-inquiry/${id}`);
  return result.data?.data;
};

const getInquiryQueryOptions = ({ id }: { id: TInquiryId }) => {
  return queryOptions({
    queryKey: ["inquiry", id],
    queryFn: () => fetchData(id),
    staleTime: 0,
  });
};

export const useGetInquiry = (id: TInquiryId) => {
  const reactQuery = useQuery({
    ...getInquiryQueryOptions({ id }),
  });

  return reactQuery;
};
