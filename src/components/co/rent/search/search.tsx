import { UseFormReturnType } from "@mantine/form";
import { Button, Flex, Group, Paper, Select } from "@mantine/core";
import { TRentQueryParams } from "../hooks/use-read-my-rents-api";
import { ENUMRentPaymentStatus } from "@/components/lease/hooks/use-read-rents-of-lease-api";

type TProps = {
  applyFilters: (newFilters: Partial<any>) => void;
  resetFilters: () => void;
  isLoadingList: boolean;
  form: UseFormReturnType<
    TRentQueryParams,
    (values: TRentQueryParams) => TRentQueryParams
  >;
};

export const SearchRents = ({
  applyFilters,
  resetFilters,
  isLoadingList,
  form,
}: TProps) => {
  return (
    <>
      <Paper radius={"xl"} p={2}>
        <Flex align={"center"} justify={"space-between"} gap={"xs"}>
          <Flex align={"center"} justify={"flex-start"} gap={"xs"} px={1}>
            <Select
              placeholder="Select Status"
              size="xs"
              radius={"xl"}
              searchable
              {...form.getInputProps("paymentStatus")}
              data={Object.values(ENUMRentPaymentStatus).map((status) => ({
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
        </Flex>
      </Paper>
    </>
  );
};
