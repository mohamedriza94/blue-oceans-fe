import { UseFormReturnType } from "@mantine/form";
import { TApartmentQueryParams } from "../hooks/use-read-apartments-api";
import { DataSearch } from "@/shared/components/data-search";
import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { ActionIcon, Select, Tooltip } from "@mantine/core";
import { RiAddLine } from "@remixicon/react";
import { AddBuilding } from "../add-building";
import { useRef } from "react";
import { SelectBuilding } from "./select-building";

type TProps = {
  applyFilters: (newFilters: Partial<TApartmentQueryParams>) => void;
  resetFilters: () => void;
  isLoadingList: boolean;
  form: UseFormReturnType<
    TApartmentQueryParams,
    (values: TApartmentQueryParams) => TApartmentQueryParams
  >;
};

export const SearchApartment = ({
  applyFilters,
  resetFilters,
  isLoadingList,
  form,
}: TProps) => {
  const addModalRef = useRef<{ open: () => void; close: () => void }>(null);

  const STATUS_OPTIONS = ["Available", "Occupied", "Maintenance"] as const;
  const CLASS_OPTIONS = [
    "Luxury",
    "Standard",
    "Studio",
    "Penthouse",
    "Duplex",
  ] as const;

  return (
    <DataSearch
      placeholder="Search by Apartment No."
      onSearchChange={(value) => applyFilters({ identification: value })}
      form={form}
      applyFilters={applyFilters}
      resetFilters={resetFilters}
      nameOfSearchField="label"
      isLoading={isLoadingList}
      elementSizes="xs"
      customRightSection={
        <CustomMantineModal
          ref={addModalRef}
          customTrigger={
            <Tooltip label="Add an Apartment">
              <ActionIcon variant="transparent">
                <RiAddLine />
              </ActionIcon>
            </Tooltip>
          }
          size={"sm"}
          withCloseButton
          title="Add Apartment"
          styles={{
            title: {
              fontWeight: 600,
            },
          }}
          centered
        >
          <AddBuilding closeModal={() => addModalRef.current?.close()} />
        </CustomMantineModal>
      }
    >
      <Select
        size="xs"
        label="Status"
        placeholder="Select a status"
        data={STATUS_OPTIONS.map((status) => ({
          value: status,
          label: status,
        }))}
        value={form.values.status as TApartmentQueryParams["status"]}
        onChange={(value) => {
          form.setFieldValue(
            "status",
            value as TApartmentQueryParams["status"],
          );
        }}
        key={form.key("status")}
      />

      <Select
        size="xs"
        label="Class"
        placeholder="Select a class"
        data={CLASS_OPTIONS.map((item) => ({
          value: item,
          label: item,
        }))}
        value={form.values.class as TApartmentQueryParams["class"]}
        onChange={(value) => {
          form.setFieldValue("class", value as TApartmentQueryParams["class"]);
        }}
        key={form.key("class")}
      />

      <SelectBuilding
        setValue={(value) => form.setFieldValue("buildingId", value)}
        value={form.values.buildingId}
        disabled={isLoadingList}
      />
    </DataSearch>
  );
};
