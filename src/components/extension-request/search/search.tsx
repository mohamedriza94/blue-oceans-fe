import { UseFormReturnType } from "@mantine/form";
import { Button, Flex, Group, Paper, Select } from "@mantine/core";
import { TExtensionRequestQueryParams } from "../hooks/use-read-extension-requests-api";
import { ENUMExtRequest } from "@/components/co/lease/create-extension-request/hooks/use-create-extension-request-api";

type TProps = {
  applyFilters: (newFilters: Partial<TExtensionRequestQueryParams>) => void;
  resetFilters: () => void;
  isLoadingList: boolean;
  form: UseFormReturnType<
    TExtensionRequestQueryParams,
    (values: TExtensionRequestQueryParams) => TExtensionRequestQueryParams
  >;
};

export const SearchExtensionRequest = ({
  applyFilters,
  resetFilters,
  isLoadingList,
  form,
}: TProps) => {
  return (
    <Paper radius={"xl"} p={2}>
      <Flex align={"center"} justify={"space-between"} gap={"xs"}>
        <Flex align={"center"} justify={"flex-start"} gap={"xs"} px={1}>
          <Select
            placeholder="Select Status"
            size="xs"
            radius={"xl"}
            searchable
            {...form.getInputProps("status")}
            data={Object.values(ENUMExtRequest).map((status) => ({
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
                form.reset();
                resetFilters();
              }}
            >
              Reset
            </Button>
          </Group>
        </Flex>
      </Flex>
    </Paper>
  );
};
