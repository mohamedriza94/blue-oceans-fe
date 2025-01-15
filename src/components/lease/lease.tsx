import { Stack } from "@mantine/core";
import { SearchLease } from "./search";
import { useGetLeases } from "./hooks/use-read-leases-api";
import { LeasesTable } from "./table";

export const LeaseComponent = () => {
  const {
    applyFilters,
    data,
    isPending,
    isError,
    form,
    resetFilters,
    paginate,
  } = useGetLeases();

  return (
    <Stack>
      <SearchLease
        applyFilters={applyFilters}
        form={form}
        isLoadingList={isPending}
        resetFilters={resetFilters}
      />

      <LeasesTable
        isLoading={isPending}
        leases={data?.data.data.leases}
        pagination={data?.data.data.pagination}
        paginate={paginate}
        isError={isError}
      />
    </Stack>
  );
};
