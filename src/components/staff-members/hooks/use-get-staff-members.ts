import { axiosPrivate } from "@/shared/lib/axios/private";
import { TPaginationParams } from "@/shared/types/pagination";
import { useForm } from "@mantine/form";
import { queryOptions, useQuery } from "@tanstack/react-query";
import qs from "query-string";
import { useState } from "react";

export type TStaffMemberQueryParams = {
  fullName?: string | null;
  roles?: string[] | null;
  status: string | null;
  isDeleted?: boolean | undefined;
} & TPaginationParams;

const fetchData = (query: string) => {
  return axiosPrivate.get(`/staff-member/read-many-accounts?${query}`);
};

const getStaffMembersQueryOptions = ({
  params,
}: {
  params: TStaffMemberQueryParams;
}) => {
  const filteredQuery = qs.stringify(params, {
    skipNull: true,
    skipEmptyString: true,
  });
  return queryOptions({
    queryKey: ["staff-members-list", filteredQuery],
    queryFn: () => fetchData(filteredQuery),
    staleTime: 3600000,
  });
};

export const useGetStaffMembers = () => {
  const initialFilters: TStaffMemberQueryParams = {
    fullName: null,
    roles: [],
    status: "undefined",
    page: 1,
    limit: 10,
    isDeleted: false,
  };

  const [filters, setFilters] =
    useState<TStaffMemberQueryParams>(initialFilters);

  const form = useForm({
    initialValues: initialFilters,
  });

  const applyFilters = (newFilters: Partial<TStaffMemberQueryParams>) => {
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
    form.setFieldValue("fullName", "");
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
    ...getStaffMembersQueryOptions({ params: filters }),
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
