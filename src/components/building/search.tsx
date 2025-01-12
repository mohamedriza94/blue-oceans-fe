import { UseFormReturnType } from "@mantine/form";
import { TBuildingQueryParams } from "./hooks/use-read-buildings-api";
import { DataSearch } from "@/shared/components/data-search";
import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { ActionIcon, Tooltip } from "@mantine/core";
import { RiAddLine } from "@remixicon/react";
import { AddBuilding } from "./add-building";
import { useRef } from "react";

type TProps = {
  applyFilters: (newFilters: Partial<TBuildingQueryParams>) => void;
  resetFilters: () => void;
  isLoadingList: boolean;
  form: UseFormReturnType<
    TBuildingQueryParams,
    (values: TBuildingQueryParams) => TBuildingQueryParams
  >;
};

export const SearchBuilding = ({
  applyFilters,
  resetFilters,
  isLoadingList,
  form,
}: TProps) => {
  const addModalRef = useRef<{ open: () => void; close: () => void }>(null);

  return (
    <DataSearch
      placeholder="Search by Building Name"
      onSearchChange={(value) => applyFilters({ buildingName: value })}
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
            <Tooltip label="Add a Building">
              <ActionIcon variant="transparent">
                <RiAddLine />
              </ActionIcon>
            </Tooltip>
          }
          size={"sm"}
          withCloseButton
          title="Add Building"
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
    ></DataSearch>
  );
};
