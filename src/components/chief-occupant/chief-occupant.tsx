import { Stack } from "@mantine/core";
import { SearchChiefOccupant } from "./search";
import { useGetChiefOccupants } from "./hooks/use-read-chief-occupants-api";

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
    </Stack>
  );
};
