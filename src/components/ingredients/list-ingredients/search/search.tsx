import { UseFormReturnType } from "@mantine/form";
import { TIngredientsQueryParams } from "../../hooks/use-get-ingredients";
import { DataSearch } from "@/shared/components/data-search";
import { stringToBoolean } from "@/shared/utils/string-to-boolean";
import { Select, TagsInput } from "@mantine/core";
import { isDeletedOptions } from "@/shared/utils/is-deleted/is-deleted-options";

type SearchIngredientsProps = {
  applyFilters: (newFilters: Partial<TIngredientsQueryParams>) => void;
  resetFilters: () => void;
  isLoadingList: boolean;
  form: UseFormReturnType<
    TIngredientsQueryParams,
    (values: TIngredientsQueryParams) => TIngredientsQueryParams
  >;
};

export const SearchIngredients = ({
  applyFilters,
  resetFilters,
  isLoadingList,
  form,
}: SearchIngredientsProps) => {
  const statusOptions = [
    { value: "undefined", label: "All" },
    { value: "true", label: "Active" },
    { value: "false", label: "Inactive" },
  ];

  return (
    <DataSearch
      placeholder="Search by Ingredient Name"
      onSearchChange={(value) => applyFilters({ name: value })}
      form={form}
      applyFilters={applyFilters}
      resetFilters={resetFilters}
      nameOfSearchField="label"
      isLoading={isLoadingList}
    >
      {/* Keywords */}
      <TagsInput
        label={"Keywords"}
        placeholder="Enter keywords"
        key={form.key("keywords")}
        {...form.getInputProps("keywords")}
      />

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
    </DataSearch>
  );
};
