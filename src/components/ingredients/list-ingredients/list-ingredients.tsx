import { Box } from "@mantine/core";
import { useGetIngredients } from "../hooks/use-get-ingredients";
import { SearchIngredients } from "./search";
import { IngredientTable } from "./table";

export const ListIngredients = () => {
  const {
    applyFilters,
    paginate,
    resetFilters,
    isLoading,
    form,
    data,
    isError,
  } = useGetIngredients();

  return (
    <>
      <SearchIngredients
        applyFilters={applyFilters}
        resetFilters={resetFilters}
        isLoadingList={isLoading}
        form={form}
      />

      <IngredientTable
        isLoading={isLoading}
        ingredients={data?.data.data.ingredients ?? []}
        pagination={data?.data.data.pagination}
        paginate={paginate}
        isError={isError}
      />
    </>
  );
};
