import { ENUMRentPaymentStatus } from "@/components/lease/hooks/use-read-rents-of-lease-api";
import { axiosPrivate } from "@/shared/lib/axios/private";
import { TPaginationParams } from "@/shared/types/pagination";
import { useForm } from "@mantine/form";
import { queryOptions, useQuery } from "@tanstack/react-query";
import qs from "query-string";
import { useState } from "react";

export type TRentQueryParams = {
  leaseId?: string | null;
  paymentStatus?: ENUMRentPaymentStatus | null;
} & TPaginationParams;

const fetchData = (query: string) => {
  return axiosPrivate.get(`/lease/read-many-rents?${query}`);
};

const getMyRentsQueryOptions = ({ params }: { params: TRentQueryParams }) => {
  const filteredQuery = qs.stringify(params, {
    skipNull: true,
    skipEmptyString: true,
  });
  return queryOptions({
    queryKey: ["ReadRentsForOccupant", filteredQuery],
    queryFn: () => fetchData(filteredQuery),
  });
};

export const useGetMyRents = (limit = 10, leaseId: string | null) => {
  const initialFilters: TRentQueryParams = {
    leaseId,
    paymentStatus: null,
    page: 1,
    limit: limit,
  };

  const [filters, setFilters] = useState<TRentQueryParams>(initialFilters);

  const form = useForm({
    initialValues: initialFilters,
  });

  const applyFilters = (newFilters: Partial<TRentQueryParams>) => {
    const currentLimit = filters.limit;
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1,
      limit: currentLimit,
    }));
  };

  const resetFilters = () => {
    form.reset();
    setFilters({ ...initialFilters });
  };

  const paginate = (type: "change-limit" | "paginate", value: number) => {
    if (type == "change-limit") {
      setFilters((prev) => ({ ...prev, limit: value }));
    }

    if (type == "paginate") {
      setFilters((prev) => ({ ...prev, page: value }));
    }
  };

  const reactQuery = useQuery({
    ...getMyRentsQueryOptions({ params: filters }),
  });

  return {
    filters,
    applyFilters,
    paginate,
    resetFilters,
    form,
    ...reactQuery,
  };
};
