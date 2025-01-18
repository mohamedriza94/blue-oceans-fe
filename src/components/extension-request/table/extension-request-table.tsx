import { rem, Stack, Table, Text } from "@mantine/core";
import { ApartmentTableSkeleton } from "./table-skeleton";
import { TdActions } from "./data/actions";
import { TableError } from "@/shared/components/table-error";
import { CustomPagination } from "@/shared/components/pagination";
import { TExtensionRequestResponse } from "../hooks/use-read-extension-requests-api";
import { TdAvatar } from "@/components/chief-occupant/table/data/avatar";
import { TChiefOccupant } from "@/components/chief-occupant/table";
import dateFormat from "dateformat";

type TProps = {
  isLoading: boolean;
  isError: boolean;
  extensionRequests: TExtensionRequestResponse[];
  paginate: (type: "change-limit" | "paginate", value: number) => void;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

const columns = [
  "Occupant",
  "Lease",
  "Requested Date",
  "Extend Upto",
  "Status",
  "Actions",
];

export const ExtensionRequestTable = ({
  isLoading,
  isError,
  paginate,
  extensionRequests,
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
                <ApartmentTableSkeleton />
              ) : (
                extensionRequests.map((request, index) => (
                  <Table.Tr key={index + request._id}>
                    <Table.Td>
                      <TdAvatar
                        occupant={
                          request.leaseId
                            .chiefOccupantId as unknown as TChiefOccupant
                        }
                      />
                    </Table.Td>

                    <Table.Td>
                      <Text lineClamp={1}>#{request.leaseId._id}</Text>
                    </Table.Td>

                    <Table.Td>
                      <Text lineClamp={1}>
                        {dateFormat(request.requestedAt, "mmm d, yyyy")}
                      </Text>
                    </Table.Td>

                    <Table.Td>
                      <Text lineClamp={1}>
                        {dateFormat(request.requestedEndDate, "mmm d, yyyy")}
                      </Text>
                    </Table.Td>

                    <Table.Td>
                      <Text lineClamp={1}>{request.status}</Text>
                    </Table.Td>

                    {/* Actions */}
                    <Table.Td>
                      <TdActions extensionRequestId={request._id} />
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
