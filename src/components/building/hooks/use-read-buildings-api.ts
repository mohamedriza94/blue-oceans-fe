import { axiosPrivate } from "@/shared/lib/axios/private";
import { TPaginationParams } from "@/shared/types/pagination";
import { useForm } from "@mantine/form";
import { queryOptions, useQuery } from "@tanstack/react-query";
import qs from "query-string";
import { useState } from "react";

export type TBuildingQueryParams = {
  buildingName?: string | null;
  address?: string | null;
} & TPaginationParams;

const fetchData = (query: string) => {
  return axiosPrivate.get(`/building/read-many-buildings?${query}`);
};

const getBuildingsQueryOptions = ({
  params,
}: {
  params: TBuildingQueryParams;
}) => {
  const filteredQuery = qs.stringify(params, {
    skipNull: true,
    skipEmptyString: true,
  });
  return queryOptions({
    queryKey: ["buildings-list", filteredQuery],
    queryFn: () => fetchData(filteredQuery),
    staleTime: 600000,
  });
};

export const useGetBuildings = (limit = 10) => {
  const initialFilters: TBuildingQueryParams = {
    buildingName: null,
    address: null,
    page: 1,
    limit: limit,
  };

  const [filters, setFilters] = useState<TBuildingQueryParams>(initialFilters);

  const form = useForm({
    initialValues: initialFilters,
  });

  const applyFilters = (newFilters: Partial<TBuildingQueryParams>) => {
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
    form.setFieldValue("email", "");
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
    ...getBuildingsQueryOptions({ params: filters }),
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
