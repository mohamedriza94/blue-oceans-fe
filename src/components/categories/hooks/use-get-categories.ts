import { axiosPrivate } from "@/shared/lib/axios/private";
import {
  TPaginationParams,
  TPaginationResponse,
} from "@/shared/types/pagination";
import { useForm } from "@mantine/form";
import { queryOptions, useQuery } from "@tanstack/react-query";
import qs from "query-string";
import { useState } from "react";
import { TCategory } from "../types/category";

export type TCategoriesQueryParams = {
  name?: string | null;
  isActive?: boolean | undefined;
  isDeleted?: boolean | undefined;
  hideChildCategories?: boolean;
} & TPaginationParams;

const fetchData = async (
  query: string,
): Promise<{
  data: {
    data: {
      categories: TCategory[];
      pagination: TPaginationResponse;
    };
  };
}> => {
  return await axiosPrivate.get(`/category/read-categories-items?${query}`);
};

const getCategoriesQueryOptions = ({
  params,
}: {
  params: TCategoriesQueryParams;
}) => {
  const filteredQuery = qs.stringify(params, {
    skipNull: true,
    skipEmptyString: true,
  });
  return queryOptions({
    queryKey: ["categories-list", filteredQuery],
    queryFn: () => fetchData(filteredQuery),
  });
};

export const useGetCategories = () => {
  const initialFilters: TCategoriesQueryParams = {
    name: null,
    isActive: true,
    page: 1,
    limit: 10,
    isDeleted: false,
  };

  const [filters, setFilters] =
    useState<TCategoriesQueryParams>(initialFilters);

  const form = useForm({
    initialValues: initialFilters,
  });

  const applyFilters = (newFilters: Partial<TCategoriesQueryParams>) => {
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
    ...getCategoriesQueryOptions({ params: filters }),
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
