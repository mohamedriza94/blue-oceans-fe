import { axiosPrivate } from "@/shared/lib/axios/private";
import { TPaginationParams } from "@/shared/types/pagination";
import { useForm } from "@mantine/form";
import { queryOptions, useQuery } from "@tanstack/react-query";
import qs from "query-string";
import { useState } from "react";

export type TApartmentQueryParams = {
  buildingId?: string | null;
  identification?: string | null;
  status?: "Available" | "Occupied" | "Maintenance" | null;
  class?: "Luxury" | "Standard" | "Studio" | "Penthouse" | "Duplex" | null;
} & TPaginationParams;

const fetchData = (query: string) => {
  return axiosPrivate.get(`/apartment/read-many-apartments?${query}`);
};

const getApartmentsQueryOptions = ({
  params,
}: {
  params: TApartmentQueryParams;
}) => {
  const filteredQuery = qs.stringify(params, {
    skipNull: true,
    skipEmptyString: true,
  });
  return queryOptions({
    queryKey: ["apartments-list", filteredQuery],
    queryFn: () => fetchData(filteredQuery),
  });
};

export const useGetApartments = (limit = 10) => {
  const initialFilters: TApartmentQueryParams = {
    buildingId: null,
    identification: null,
    status: null,
    class: null,
    page: 1,
    limit: limit,
  };

  const [filters, setFilters] = useState<TApartmentQueryParams>(initialFilters);

  const form = useForm({
    initialValues: initialFilters,
  });

  const applyFilters = (newFilters: Partial<TApartmentQueryParams>) => {
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
    ...getApartmentsQueryOptions({ params: filters }),
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
