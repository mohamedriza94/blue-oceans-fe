import { axiosPrivate } from "@/shared/lib/axios/private";
import { TPaginationParams } from "@/shared/types/pagination";
import { useForm } from "@mantine/form";
import { queryOptions, useQuery } from "@tanstack/react-query";
import qs from "query-string";
import { useState } from "react";
import { ENUMLeaseStatus } from "./create-lease/use-create-lease-api";
import { TApartment, TChiefOccupant } from "./create-lease/lease-agreement";

export type TLeaseItem = {
  _id: string;
  apartmentId: TApartment;
  chiefOccupantId: TChiefOccupant;
  startDate: string;
  endDate: string;
  rentAmountInUSD: number;
  paymentSchedule: string;
  status: string;
  securityDepositInUSD: number;
  termsAndConditions: string;
};

export type TLeaseQueryParams = {
  chiefOccupantId?: string | null;
  apartmentId?: string | null;
  status?: ENUMLeaseStatus | null;
} & TPaginationParams;

const fetchData = (query: string) => {
  return axiosPrivate.get(`/lease/read-many-leases?${query}`);
};

const getLeasesQueryOptions = ({ params }: { params: TLeaseQueryParams }) => {
  const filteredQuery = qs.stringify(params, {
    skipNull: true,
    skipEmptyString: true,
  });
  return queryOptions({
    queryKey: ["lease-list", filteredQuery],
    queryFn: () => fetchData(filteredQuery),
    staleTime: 600000,
  });
};

export const useGetLeases = (limit = 10) => {
  const initialFilters: TLeaseQueryParams = {
    chiefOccupantId: null,
    apartmentId: null,
    status: null,
    page: 1,
    limit: limit,
  };

  const [filters, setFilters] = useState<TLeaseQueryParams>(initialFilters);

  const form = useForm({
    initialValues: initialFilters,
  });

  const applyFilters = (newFilters: Partial<TLeaseQueryParams>) => {
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
    ...getLeasesQueryOptions({ params: filters }),
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
