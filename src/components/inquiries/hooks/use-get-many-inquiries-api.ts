import { axiosPrivate } from "@/shared/lib/axios/private";
import { TPaginationParams } from "@/shared/types/pagination";
import { useForm } from "@mantine/form";
import { queryOptions, useQuery } from "@tanstack/react-query";
import qs from "query-string";
import { useState } from "react";

export type TInquiryQueryParams = {
  email?: string | null;
  priority?: string | null;
  status?: string | null;
  isRead?: boolean | null;
} & TPaginationParams;

const fetchData = (query: string) => {
  return axiosPrivate.get(`/inquiry/read-many-inquiries?${query}`);
};

const getInquiriesQueryOptions = ({
  params,
}: {
  params: TInquiryQueryParams;
}) => {
  const filteredQuery = qs.stringify(params, {
    skipNull: true,
    skipEmptyString: true,
  });
  return queryOptions({
    queryKey: ["inquiries-list", filteredQuery],
    queryFn: () => fetchData(filteredQuery),
    staleTime: 600000,
  });
};

export const useGetInquiries = () => {
  const initialFilters: TInquiryQueryParams = {
    email: null,
    isRead: null,
    priority: "undefined",
    status: "undefined",
    page: 1,
    limit: 10,
  };

  const [filters, setFilters] = useState<TInquiryQueryParams>(initialFilters);

  const form = useForm({
    initialValues: initialFilters,
  });

  const applyFilters = (newFilters: Partial<TInquiryQueryParams>) => {
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
    ...getInquiriesQueryOptions({ params: filters }),
  });

  return {
    filters,
    applyFilters,
    paginate,
    resetFilters,
    form,
    ...reactQuery,
    data: reactQuery.data?.data.data
  };
};
