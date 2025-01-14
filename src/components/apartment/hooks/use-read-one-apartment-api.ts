import { axiosPrivate } from "@/shared/lib/axios/private";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { TApartment } from "../table";

const fetchData = (
  apartmentId: string,
): Promise<{ data: { data: TApartment } }> => {
  return axiosPrivate.get(`/apartment/read-one-apartment/${apartmentId}`);
};

const getApartmentQueryOptions = (apartmentId: string) => {
  return queryOptions({
    queryKey: ["apartment", apartmentId],
    queryFn: () => fetchData(apartmentId),
  });
};

export const useGetOneApartment = (apartmentId: string) => {
  const reactQuery = useQuery({
    ...getApartmentQueryOptions(apartmentId),
  });

  return {
    ...reactQuery,
  };
};
