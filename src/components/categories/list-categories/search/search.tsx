import { UseFormReturnType } from "@mantine/form";
import { DataSearch } from "@/shared/components/data-search";
import { stringToBoolean } from "@/shared/utils/string-to-boolean";
import { Select, TagsInput } from "@mantine/core";
import { isDeletedOptions } from "@/shared/utils/is-deleted/is-deleted-options";
import { TCategoriesQueryParams } from "../../hooks/use-get-categories";

type SearchCategoriesProps = {
  applyFilters: (newFilters: Partial<TCategoriesQueryParams>) => void;
  resetFilters: () => void;
  isLoadingList: boolean;
  form: UseFormReturnType<
    TCategoriesQueryParams,
    (values: TCategoriesQueryParams) => TCategoriesQueryParams
  >;
};

export const SearchCategories = ({
  applyFilters,
  resetFilters,
  isLoadingList,
  form,
}: SearchCategoriesProps) => {
  const statusOptions = [
    { value: "undefined", label: "All" },
    { value: "true", label: "Active" },
    { value: "false", label: "Inactive" },
  ];

  const hideChildCategoriesOptions = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
  ];

  return (
    <DataSearch
      placeholder="Search by Category Name"
      onSearchChange={(value) => applyFilters({ name: value })}
      form={form}
      applyFilters={applyFilters}
      resetFilters={resetFilters}
      nameOfSearchField="label"
      isLoading={isLoadingList}
    >
      {/* Status */}
      <Select
        label={"Status"}
        placeholder="Select a Status"
        data={statusOptions}
        value={String(form.values.isActive)}
        onChange={(value) => {
          form.setFieldValue("isActive", stringToBoolean(value));
        }}
        key={form.key("isActive")}
      />

      {/* Deleted Records */}
      <Select
        label={"Show Deleted Records"}
        placeholder="Include Deleted Records"
        data={isDeletedOptions}
        value={String(form.values.isDeleted)}
        onChange={(value) => {
          form.setFieldValue("isDeleted", stringToBoolean(value));
        }}
        key={form.key("isDeleted")}
      />

      {/* Hide Child Categories */}
      {hideChildCategoriesOptions && (
        <Select
          label={"Hide Child Categories"}
          placeholder="Include Deleted Records"
          data={hideChildCategoriesOptions}
          value={String(form.values.hideChildCategories)}
          onChange={(value) => {
            form.setFieldValue("hideChildCategories", stringToBoolean(value));
          }}
          key={form.key("hideChildCategories")}
        />
      )}
    </DataSearch>
  );
};
