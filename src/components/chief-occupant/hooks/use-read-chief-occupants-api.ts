import { axiosPrivate } from "@/shared/lib/axios/private";
import { TPaginationParams } from "@/shared/types/pagination";
import { useForm } from "@mantine/form";
import { queryOptions, useQuery } from "@tanstack/react-query";
import qs from "query-string";
import { useState } from "react";

export type TChiefOccupantQueryParams = {
  apartmentId?: string | null;
  fullName?: string | null;
  status?: "Active" | "Inactive" | null;
} & TPaginationParams;

const fetchData = (query: string) => {
  return axiosPrivate.get(`/chief-occupant/read-many?${query}`);
};

const getChiefOccupantsQueryOptions = ({
  params,
}: {
  params: TChiefOccupantQueryParams;
}) => {
  const filteredQuery = qs.stringify(params, {
    skipNull: true,
    skipEmptyString: true,
  });
  return queryOptions({
    queryKey: ["chief-occupants-list", filteredQuery],
    queryFn: () => fetchData(filteredQuery),
  });
};

export const useGetChiefOccupants = (limit = 10) => {
  const initialFilters: TChiefOccupantQueryParams = {
    apartmentId: null,
    fullName: null,
    status: null,
    page: 1,
    limit: limit,
  };

  const [filters, setFilters] =
    useState<TChiefOccupantQueryParams>(initialFilters);

  const form = useForm({
    initialValues: initialFilters,
  });

  const applyFilters = (newFilters: Partial<TChiefOccupantQueryParams>) => {
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
    ...getChiefOccupantsQueryOptions({ params: filters }),
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
