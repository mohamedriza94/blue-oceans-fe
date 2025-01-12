import { DataSearch } from "@/shared/components/data-search";
import { MultiSelect, Select } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { TStaffMemberQueryParams } from "../hooks/use-get-staff-members";
import { useStaffMemberSearchOptions } from "../hooks/use-get-search-options";
import { isDeletedOptions } from "@/shared/utils/is-deleted/is-deleted-options";
import { stringToBoolean } from "@/shared/utils/string-to-boolean";

type SearchStaffMembersProps = {
  applyFilters: (newFilters: Partial<TStaffMemberQueryParams>) => void;
  resetFilters: () => void;
  isLoadingList: boolean;
  form: UseFormReturnType<
    TStaffMemberQueryParams,
    (values: TStaffMemberQueryParams) => TStaffMemberQueryParams
  >;
  customRightSection: React.ReactNode;
};

export const SearchStaffMembers = ({
  applyFilters,
  resetFilters,
  isLoadingList,
  form,
  customRightSection,
}: SearchStaffMembersProps) => {
  const { data: options } = useStaffMemberSearchOptions();

  return (
    <DataSearch
      placeholder="Search by Staff Name or Email"
      onSearchChange={(value) => applyFilters({ fullName: value })}
      form={form}
      applyFilters={applyFilters}
      resetFilters={resetFilters}
      nameOfSearchField="fullName"
      isLoading={isLoadingList}
      customRightSection={customRightSection}
    >
      {/* Status */}
      <Select
        label={"Status"}
        placeholder="Select a Status"
        data={[
          { value: "undefined", label: "All" },
          ...(options?.statuses.map((status) => ({
            value: status,
            label: status.charAt(0).toUpperCase() + status.slice(1),
          })) ?? []),
        ]}
        value={String(form.values.status)}
        onChange={(value) => form.setFieldValue("status", value)}
        key={form.key("status")}
      />

      {/* Roles */}
      <MultiSelect
        label={"Roles"}
        placeholder="Pick the Roles"
        data={
          options?.roles.map((role) => ({
            value: role,
            label: role.charAt(0).toUpperCase() + role.slice(1),
          })) ?? []
        }
        {...form.getInputProps("roles")}
        key={form.key("roles")}
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
