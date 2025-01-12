import { useGetCategories } from "../hooks/use-get-categories";
import { SearchCategories } from "./search";
import { CategoryTable } from "./table";

export const ListCategories = () => {
  const {
    applyFilters,
    paginate,
    resetFilters,
    isLoading,
    form,
    data,
    isError,
  } = useGetCategories();

  return (
    <>
      <SearchCategories
        applyFilters={applyFilters}
        resetFilters={resetFilters}
        isLoadingList={isLoading}
        form={form}
      />

      <CategoryTable
        isLoading={isLoading}
        categories={data?.data.data.categories ?? []}
        pagination={data?.data.data.pagination!}
        paginate={paginate}
        isError={isError}
      />
    </>
  );
};
