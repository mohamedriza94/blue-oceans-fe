import { Stack } from "@mantine/core";
import { SearchApartment } from "./search/search";
import { useGetApartments } from "./hooks/use-read-apartments-api";
import { BuildingTable } from "./table";

export const ApartmentComponent = () => {
  const {
    applyFilters,
    data,
    isPending,
    isError,
    form,
    resetFilters,
    paginate,
  } = useGetApartments();

  return (
    <Stack>
      <SearchApartment
        applyFilters={applyFilters}
        form={form}
        isLoadingList={isPending}
        resetFilters={resetFilters}
      />
    </Stack>
  );
};
