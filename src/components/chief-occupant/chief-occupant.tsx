import { Stack } from "@mantine/core";
import { SearchChiefOccupant } from "./search";
import { useGetChiefOccupants } from "./hooks/use-read-chief-occupants-api";
import { ChiefOccupantTable } from "./table";

export const ChiefOccupantComponent = () => {
  const {
    applyFilters,
    data,
    isPending,
    isError,
    form,
    resetFilters,
    paginate,
  } = useGetChiefOccupants();

  return (
    <Stack>
      <SearchChiefOccupant
        applyFilters={applyFilters}
        form={form}
        isLoadingList={isPending}
        resetFilters={resetFilters}
      />

      <ChiefOccupantTable
        isLoading={isPending}
        chiefOccupants={data?.data.data.chiefOccupants}
        pagination={data?.data.data.pagination}
        paginate={paginate}
        isError={isError}
      />
    </Stack>
  );
};
