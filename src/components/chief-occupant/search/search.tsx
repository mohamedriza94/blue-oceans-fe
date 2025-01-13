import { UseFormReturnType } from "@mantine/form";
import { DataSearch } from "@/shared/components/data-search";
import { Select } from "@mantine/core";
import { TChiefOccupantQueryParams } from "../hooks/use-read-chief-occupants-api";
import { AddChiefOccupantModal } from "../add-chief-occupant/add-chief-occupant-modal";
import { chiefOccupantStatus } from "../hooks/add-chief-occupant/use-add-chief-occupant-form";

type TProps = {
  applyFilters: (newFilters: Partial<TChiefOccupantQueryParams>) => void;
  resetFilters: () => void;
  isLoadingList: boolean;
  form: UseFormReturnType<
    TChiefOccupantQueryParams,
    (values: TChiefOccupantQueryParams) => TChiefOccupantQueryParams
  >;
};

export const SearchChiefOccupant = ({
  applyFilters,
  resetFilters,
  isLoadingList,
  form,
}: TProps) => {
  return (
    <DataSearch
      placeholder="Search by Full Name"
      onSearchChange={(value) => applyFilters({ fullName: value })}
      form={form}
      applyFilters={applyFilters}
      resetFilters={resetFilters}
      nameOfSearchField="label"
      isLoading={isLoadingList}
      elementSizes="xs"
      customRightSection={<AddChiefOccupantModal />}
    >
      <Select
        size="xs"
        label="Status"
        placeholder="Select a status"
        data={chiefOccupantStatus.map((status) => ({
          value: status,
          label: status,
        }))}
        value={form.values.status as TChiefOccupantQueryParams["status"]}
        onChange={(value) => {
          form.setFieldValue(
            "status",
            value as TChiefOccupantQueryParams["status"],
          );
        }}
        key={form.key("status")}
      />
    </DataSearch>
  );
};
