import { rem, Stack, Table, Text } from "@mantine/core";
import { TdActions } from "./data/actions";
import { TableError } from "@/shared/components/table-error";
import { CustomPagination } from "@/shared/components/pagination";
import { TdAvatar } from "./data/avatar";
import { TDependentPayload } from "../hooks/add-dependant/use-add-dependant-form";
import { useGetDependants } from "../hooks/use-read-dependants-api";
import { DependantTableSkeleton } from "./table-skeleton";
import dateFormat from "dateformat";

export type TDependant = {
  _id: string;
} & TDependentPayload;

const columns = [
  "Name",
  "Relationship",
  "Contact Number",
  "Date of Birth",
  "Actions",
];

export const DependantTable = ({ occupantId }: { occupantId: string }) => {
  const { data, isPending, isError } = useGetDependants(occupantId);

  return (
    <Stack
      align="stretch"
      bg={"#FFFFFF"}
      p={"xs"}
      style={{ borderRadius: rem(20) }}
    >
      {isError ? (
        <TableError />
      ) : (
        <>
          <Table>
            <Table.Thead>
              <Table.Tr>
                {columns.map((column) => (
                  <Table.Th fw={600} fz={"md"}>
                    {column}
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {isPending ? (
                <DependantTableSkeleton />
              ) : (
                data.data.data.map((dependant: TDependant, index: number) => (
                  <Table.Tr key={index + dependant._id}>
                    <Table.Td>
                      <TdAvatar dependant={dependant} />
                    </Table.Td>

                    <Table.Td>
                      <Text lineClamp={1} title={dependant.relationship}>
                        {dependant.relationship}
                      </Text>
                    </Table.Td>

                    <Table.Td>
                      <Text lineClamp={1} title={dependant.contactNumber}>
                        {dependant?.contactNumber || "N/A"}
                      </Text>
                    </Table.Td>

                    <Table.Td>
                      <Text
                        lineClamp={1}
                        title={dateFormat(
                          dependant?.dateOfBirth,
                          "mmm d, yyyy",
                        )}
                      >
                        {dateFormat(dependant?.dateOfBirth, "mmm d, yyyy")}
                      </Text>
                    </Table.Td>

                    {/* Actions */}
                    <Table.Td>
                      <TdActions dependant={dependant} />
                    </Table.Td>
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>
        </>
      )}
    </Stack>
  );
};
