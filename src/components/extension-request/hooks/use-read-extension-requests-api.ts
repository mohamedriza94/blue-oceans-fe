import { ENUMExtRequest } from "@/components/co/lease/create-extension-request/hooks/use-create-extension-request-api";
import { axiosPrivate } from "@/shared/lib/axios/private";
import { TPaginationParams } from "@/shared/types/pagination";
import { useForm } from "@mantine/form";
import { queryOptions, useQuery } from "@tanstack/react-query";
import qs from "query-string";
import { useState } from "react";

export type TExtensionRequestResponse = {
  _id: string;
  leaseId: {
    _id: string;
    apartmentId: string;
    chiefOccupantId: {
      _id: string;
      apartmentId: string;
      image: string;
      fullName: string;
      contactNumber: string;
      email: string;
      password: string;
      status: string;
    };
    startDate: string;
    endDate: string;
    rentAmountInUSD: number;
    paymentSchedule: string;
    status: string;
    securityDepositInUSD: number;
    termsAndConditions: string;
    documentURLs: {
      url: string;
      name: string;
      _id: string;
    }[];
    createdAt: string;
    updatedAt: string;
  };
  requestedEndDate: string;
  reason: string;
  status: string;
  requestedAt: string;
};

export type TExtensionRequestQueryParams = {
  status?: ENUMExtRequest | null;
} & TPaginationParams;

const fetchData = (query: string) => {
  return axiosPrivate.get(`/extension-request/read-many?${query}`);
};

const getExtensionRequestsQueryOptions = ({
  params,
}: {
  params: TExtensionRequestQueryParams;
}) => {
  const filteredQuery = qs.stringify(params, {
    skipNull: true,
    skipEmptyString: true,
  });
  return queryOptions({
    queryKey: ["extensionRequests-list", filteredQuery],
    queryFn: () => fetchData(filteredQuery),
  });
};

export const useGetExtensionRequests = (limit = 10) => {
  const initialFilters: TExtensionRequestQueryParams = {
    status: null,
    page: 1,
    limit: limit,
  };

  const [filters, setFilters] = useState<TExtensionRequestQueryParams>(initialFilters);

  const form = useForm({
    initialValues: initialFilters,
  });

  const applyFilters = (newFilters: Partial<TExtensionRequestQueryParams>) => {
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
    ...getExtensionRequestsQueryOptions({ params: filters }),
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
