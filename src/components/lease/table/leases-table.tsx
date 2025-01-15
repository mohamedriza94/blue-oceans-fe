import { rem, Stack, Table, Text } from "@mantine/core";
import { TdActions } from "./data/actions";
import { TableError } from "@/shared/components/table-error";
import { CustomPagination } from "@/shared/components/pagination";
import { LeasesTableSkeleton } from "./table-skeleton";
import { TdAvatar } from "./data/avatar";
import { TLeaseItem } from "../hooks/use-read-leases-api";
import dateFormat from "dateformat";

type TProps = {
  isLoading: boolean;
  isError: boolean;
  leases: TLeaseItem[];
  paginate: (type: "change-limit" | "paginate", value: number) => void;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

const columns = [
  "Chief Occupant",
  "From",
  "To",
  "Status",
  "Apartment",
  "Actions",
];

export const LeasesTable = ({
  isLoading,
  isError,
  paginate,
  leases,
  pagination,
}: TProps) => {
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
              {isLoading ? (
                <LeasesTableSkeleton />
              ) : (
                leases.map((lease, index) => (
                  <Table.Tr key={index + lease._id}>
                    <Table.Td>
                      <TdAvatar occupant={lease.chiefOccupantId} />
                    </Table.Td>

                    <Table.Td>
                      {dateFormat(lease.startDate, "mmm d, yyyy")}
                    </Table.Td>

                    <Table.Td>
                      {dateFormat(lease.endDate, "mmm d, yyyy")}
                    </Table.Td>

                    <Table.Td>{lease.status}</Table.Td>

                    <Table.Td>{lease.apartmentId.identification}</Table.Td>

                    {/* Actions */}
                    <Table.Td>
                      <TdActions lease={lease} />
                    </Table.Td>
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>

          {!isLoading && (
            <CustomPagination
              pagination={pagination}
              paginate={paginate}
              showLimitSetter
            />
          )}
        </>
      )}
    </Stack>
  );
};
