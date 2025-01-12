import { useGetMenus } from "../hooks/list-menus/use-get-menus";
import { SearchMenus } from "./search";
import { MenuTable } from "./table";

export const ListMenu = () => {
  const {
    applyFilters,
    paginate,
    resetFilters,
    isLoading,
    form,
    data,
    isError,
  } = useGetMenus();

  return (
    <>
      <SearchMenus
        applyFilters={applyFilters}
        resetFilters={resetFilters}
        isLoadingList={isLoading}
        form={form}
      />

      <MenuTable
        isLoading={isLoading}
        menus={data?.data.data.menuItems ?? []}
        pagination={data?.data.data.pagination}
        paginate={paginate}
        isError={isError}
      />
    </>
  );
};
