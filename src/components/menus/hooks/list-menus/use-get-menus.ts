import { axiosPrivate } from "@/shared/lib/axios/private";
import { TPaginationParams } from "@/shared/types/pagination";
import { useForm } from "@mantine/form";
import { queryOptions, useQuery } from "@tanstack/react-query";
import qs from "query-string";
import { useState } from "react";

export type TMenusQueryParams = {
  label?: string | null;
  allowedRoles?: string[] | null;
  isActive?: boolean | undefined;
  isDeleted?: boolean | undefined;
} & TPaginationParams;

const fetchData = (query: string) => {
  return axiosPrivate.get(`/menu-item/read-many-menu-items?${query}`);
};

const getMenusQueryOptions = ({ params }: { params: TMenusQueryParams }) => {
  const filteredQuery = qs.stringify(params, {
    skipNull: true,
    skipEmptyString: true,
  });
  return queryOptions({
    queryKey: ["menus-list", filteredQuery],
    queryFn: () => fetchData(filteredQuery),
    staleTime: 3600000,
  });
};

export const useGetMenus = () => {
  const initialFilters: TMenusQueryParams = {
    label: null,
    allowedRoles: [],
    isActive: true,
    page: 1,
    limit: 10,
    isDeleted: false,
  };

  const [filters, setFilters] = useState<TMenusQueryParams>(initialFilters);

  const form = useForm({
    initialValues: initialFilters,
  });

  const applyFilters = (newFilters: Partial<TMenusQueryParams>) => {
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
    form.setFieldValue("label", "");
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
    ...getMenusQueryOptions({ params: filters }),
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
