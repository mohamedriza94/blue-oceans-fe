import { Badge, NumberFormatter, rem, Stack, Table, Text } from "@mantine/core";
import { TdActions } from "./data/actions";
import { TableError } from "@/shared/components/table-error";
import { CustomPagination } from "@/shared/components/pagination";
import { LeasesTableSkeleton } from "./table-skeleton";
import { TdAvatar } from "./data/avatar";
import dateFormat from "dateformat";
import {
  ENUMRentPaymentStatus,
  TRent,
} from "@/components/lease/hooks/use-read-rents-of-lease-api";

type TProps = {
  isLoading: boolean;
  isError: boolean;
  rents: TRent[];
  paginate: (type: "change-limit" | "paginate", value: number) => void;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

const columns = [
  "Due Date",
  "Amount",
  "Penalty",
  "Status",
  "Payment Date",
  "Actions",
];

export const RentsTable = ({
  isLoading,
  isError,
  paginate,
  rents,
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
                rents.map((rent, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>
                      {dateFormat(rent.dueDate, "mmm d, yyyy")}
                    </Table.Td>

                    <Table.Td>
                      <NumberFormatter value={rent.amount} suffix="USD" />
                    </Table.Td>

                    <Table.Td>
                      <NumberFormatter
                        value={rent.penaltyAmount}
                        suffix="USD"
                      />
                    </Table.Td>

                    <Table.Td>
                      <Badge
                        radius={"xl"}
                        variant="filled"
                        color={
                          rent.paymentStatus == ENUMRentPaymentStatus.Overdue
                            ? "amaranthRed.5"
                            : rent.paymentStatus == ENUMRentPaymentStatus.Paid
                              ? "green.5"
                              : "orange.5"
                        }
                      >
                        {rent.paymentStatus}
                      </Badge>
                    </Table.Td>

                    <Table.Td>
                      {rent.paymentDate
                        ? dateFormat(rent.paymentDate, "mmm d, yyyy")
                        : "NA"}
                    </Table.Td>

                    {/* Actions */}
                    <Table.Td>
                      {rent.paymentStatus == ENUMRentPaymentStatus.Paid ? (
                        "NA"
                      ) : (
                        <TdActions rentId={rent._id} />
                      )}
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
