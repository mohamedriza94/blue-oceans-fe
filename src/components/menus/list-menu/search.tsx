import { useGetStaffMemberAttributes } from "@/components/staff-members/hooks/use-get-staff-member-attributes";
import { DataSearch } from "@/shared/components/data-search";
import { MultiSelect, Select } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { TMenusQueryParams } from "../hooks/list-menus/use-get-menus";
import { stringToBoolean } from "@/shared/utils/string-to-boolean";
import { isDeletedOptions } from "@/shared/utils/is-deleted/is-deleted-options";

type SearchMenusProps = {
  applyFilters: (newFilters: Partial<TMenusQueryParams>) => void;
  resetFilters: () => void;
  isLoadingList: boolean;
  form: UseFormReturnType<
    TMenusQueryParams,
    (values: TMenusQueryParams) => TMenusQueryParams
  >;
};

export const SearchMenus = ({
  applyFilters,
  resetFilters,
  isLoadingList,
  form,
}: SearchMenusProps) => {
  const { data: attributes } = useGetStaffMemberAttributes();

  const statusOptions = [
    { value: "undefined", label: "All" },
    { value: "true", label: "Active" },
    { value: "false", label: "Inactive" },
  ];

  return (
    <DataSearch
      placeholder="Search by Menu Label"
      onSearchChange={(value) => applyFilters({ label: value })}
      form={form}
      applyFilters={applyFilters}
      resetFilters={resetFilters}
      nameOfSearchField="label"
      isLoading={isLoadingList}
    >
      {/* Allowed Roles */}
      <MultiSelect
        label={"Allowed Roles"}
        placeholder="Pick the Roles"
        data={
          attributes?.roles.map((role) => ({
            value: role,
            label: role.charAt(0).toUpperCase() + role.slice(1),
          })) ?? []
        }
        {...form.getInputProps("allowedRoles")}
        key={form.key("allowedRoles")}
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
