import { UseFormReturnType } from "@mantine/form";
import { DataSearch } from "@/shared/components/data-search";
import { CreateLeaseModal } from "../create-lease/create-lease-modal";
import { Button, Flex, Group, Paper, Select } from "@mantine/core";
import { TLeaseQueryParams } from "../hooks/use-read-leases-api";
import { ENUMLeaseStatus } from "../hooks/create-lease/use-create-lease-api";
import { useGetApartments } from "@/components/apartment/hooks/use-read-apartments-api";
import { useGetChiefOccupants } from "@/components/chief-occupant/hooks/use-read-chief-occupants-api";
import { TApartment } from "@/components/apartment/table";
import { TChiefOccupant } from "@/components/chief-occupant/table";

type TProps = {
  applyFilters: (newFilters: Partial<any>) => void;
  resetFilters: () => void;
  isLoadingList: boolean;
  form: UseFormReturnType<
    TLeaseQueryParams,
    (values: TLeaseQueryParams) => TLeaseQueryParams
  >;
};

export const SearchLease = ({
  applyFilters,
  resetFilters,
  isLoadingList,
  form,
}: TProps) => {
  const { data: dataApartments, isPending: loadingApartments } =
    useGetApartments(1000);
  const { data: dataOccupants, isPending: loadingOccupants } =
    useGetChiefOccupants(1000);

  const apartments = dataApartments?.data.data.apartments?.map(
    (apartment: TApartment) => ({
      value: apartment._id,
      label: apartment.identification,
    }),
  );

  const chiefOccupants = dataOccupants?.data.data.chiefOccupants?.map(
    (occupant: TChiefOccupant) => ({
      value: occupant._id,
      label: occupant.fullName,
    }),
  );

  return (
    <>
      <Paper radius={"xl"} p={2}>
        <Flex align={"center"} justify={"space-between"} gap={"xs"}>
          <Flex align={"center"} justify={"flex-start"} gap={"xs"} px={1}>
            <Select
              placeholder="Select Apartments"
              size="xs"
              radius={"xl"}
              searchable
              {...form.getInputProps("apartmentId")}
              data={apartments}
              disabled={loadingApartments}
            />
            <Select
              placeholder="Select Chief Occupants"
              size="xs"
              radius={"xl"}
              searchable
              {...form.getInputProps("chiefOccupantId")}
              data={chiefOccupants}
              disabled={loadingOccupants}
            />
            <Select
              placeholder="Select Status"
              size="xs"
              radius={"xl"}
              searchable
              {...form.getInputProps("status")}
              data={Object.values(ENUMLeaseStatus).map((status) => ({
                value: status,
                label: status,
              }))}
            />

            <Group gap={5}>
              <Button
                radius={"xl"}
                size="xs"
                disabled={isLoadingList}
                loading={isLoadingList}
                onClick={() => applyFilters(form.values)}
              >
                Apply
              </Button>
              <Button
                bg={"gray.5"}
                radius={"xl"}
                size="xs"
                disabled={isLoadingList}
                onClick={() => {
                  form.reset(); // Reset form values to default
                  resetFilters(); // Clear filters in the API
                }}
              >
                Reset
              </Button>
            </Group>
          </Flex>
          <CreateLeaseModal />
        </Flex>
      </Paper>
    </>
  );
};
