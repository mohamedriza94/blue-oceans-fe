import { Paper, Stack } from "@mantine/core";
import { LeaseInfo } from "./lease-info";
import {
  TOccupantLease,
  useGetOccupantLease,
} from "./hooks/use-read-lease-api";
import { useGetMyRents } from "./hooks/use-read-my-rents-api";
import { SearchRents } from "./search";
import { RentsTable } from "./table";
import { useEffect } from "react";

export const RentComponent = () => {
  const { data: ld, isPending } = useGetOccupantLease();

  const leaseData: TOccupantLease | null = ld?.data.data ?? null;

  const { applyFilters, form, resetFilters, data, paginate, isError } =
    useGetMyRents(10, leaseData?._id ?? null);

  return (
    <Paper radius={"md"} bg={"white"} p={"xs"}>
      <Stack>
        {leaseData && <LeaseInfo leaseData={leaseData} isPending={isPending} />}

        <SearchRents
          applyFilters={applyFilters}
          form={form}
          isLoadingList={isPending}
          resetFilters={resetFilters}
        />

        {data?.data.data.rents && (
          <RentsTable
            isLoading={isPending}
            rents={data?.data.data.rents}
            pagination={data?.data.data.pagination}
            paginate={paginate}
            isError={isError}
          />
        )}
      </Stack>
    </Paper>
  );
};
