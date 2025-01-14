import { rem, Stack, Table, Text } from "@mantine/core";
import { ApartmentTableSkeleton } from "./table-skeleton";
import { TableError } from "@/shared/components/table-error";
import dateFormat from "dateformat";

export type TApplication = {
  _id: string;
  chiefOccupantId: string;
  apartmentId: {
    _id: string;
    identification: string;
  };
  submittedAt: Date;
  subject: string;
  description: string;
  status?: "Pending" | "Reviewed" | "Approved" | "Rejected";
};

type TProps = {
  isLoading: boolean;
  isError: boolean;
  applications: TApplication[];
};

const columns = ["Submitted At", "Related Apartment", "Subject", "Status"];

export const ApplicationTable = ({
  isLoading,
  isError,
  applications
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
                applications.map((application, index) => (
                  <Table.Tr key={index + application._id}>
                    <Table.Td>
                      <Text
                        lineClamp={1}
                        title={dateFormat(
                          application?.submittedAt,
                          "mmm d, yyyy",
                        )}
                      >
                        {dateFormat(application?.submittedAt, "mmm d, yyyy")}
                      </Text>
                    </Table.Td>

                    <Table.Td>
                      <Text
                        lineClamp={1}
                        title={application.apartmentId.identification}
                      >
                        {application.apartmentId.identification}
                      </Text>
                    </Table.Td>

                    <Table.Td>
                      <Text lineClamp={1} title={application.subject}>
                        {application.subject}
                      </Text>
                    </Table.Td>

                    <Table.Td>
                      <Text lineClamp={1} title={application.status}>
                        {application.status}
                      </Text>
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
