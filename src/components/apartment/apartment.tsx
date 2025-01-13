import { Stack } from "@mantine/core";
import { SearchApartment } from "./search/search";
import { useGetApartments } from "./hooks/use-read-apartments-api";
import { ApartmentTable } from "./table";

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

      <ApartmentTable
        isLoading={isPending}
        apartments={data?.data.data.apartments}
        pagination={data?.data.data.pagination}
        paginate={paginate}
        isError={isError}
      />
    </Stack>
  );
};
