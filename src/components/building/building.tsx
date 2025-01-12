import { Stack } from "@mantine/core";
import { SearchBuilding } from "./search";
import { useGetBuildings } from "./hooks/use-read-buildings-api";
import { BuildingTable } from "./table";

export const BuildingComponent = () => {
  const {
    applyFilters,
    data,
    isPending,
    isError,
    form,
    resetFilters,
    paginate,
  } = useGetBuildings();

  return (
    <Stack>
      <SearchBuilding
        applyFilters={applyFilters}
        form={form}
        isLoadingList={isPending}
        resetFilters={resetFilters}
      />

      <BuildingTable
        isLoading={isPending}
        buildings={data?.data.data.buildings}
        pagination={data?.data.data.pagination}
        paginate={paginate}
        isError={isError}
      />
    </Stack>
  );
};
