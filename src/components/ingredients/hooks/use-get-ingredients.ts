import { axiosPrivate } from "@/shared/lib/axios/private";
import { TPaginationParams } from "@/shared/types/pagination";
import { useForm } from "@mantine/form";
import { queryOptions, useQuery } from "@tanstack/react-query";
import qs from "query-string";
import { useState } from "react";

export type TIngredientsQueryParams = {
  name?: string | null;
  keywords?: string[] | null;
  isActive?: boolean | undefined;
  isDeleted?: boolean | undefined;
} & TPaginationParams;

const fetchData = (query: string) => {
  return axiosPrivate.get(`/ingredient/read-many-ingredients?${query}`);
};

const getIngredientsQueryOptions = ({
  params,
}: {
  params: TIngredientsQueryParams;
}) => {
  const filteredQuery = qs.stringify(params, {
    skipNull: true,
    skipEmptyString: true,
  });
  return queryOptions({
    queryKey: ["ingredients-list", filteredQuery],
    queryFn: () => fetchData(filteredQuery),
  });
};

export const useGetIngredients = () => {
  const initialFilters: TIngredientsQueryParams = {
    keywords: [],
    name: null,
    isActive: true,
    page: 1,
    limit: 10,
    isDeleted: false,
  };

  const [filters, setFilters] =
    useState<TIngredientsQueryParams>(initialFilters);

  const form = useForm({
    initialValues: initialFilters,
  });

  const applyFilters = (newFilters: Partial<TIngredientsQueryParams>) => {
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
    form.setFieldValue("name", "");
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
    ...getIngredientsQueryOptions({ params: filters }),
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
