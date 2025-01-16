import { Flex, Image, rem, Stack, Table, Text, Title } from "@mantine/core";
import {
  TOccupantLease,
  useGetOccupantLeaseList,
} from "./hooks/use-read-lease-api";
import { TableError } from "@/shared/components/table-error";
import { LeasesTableSkeleton } from "@/components/lease/table/table-skeleton";
import { TdAvatar } from "@/components/lease/table/data/avatar";
import dateFormat from "dateformat";
import { showDefaultImage } from "@/shared/utils/show-default-image";

export const LeaseList = () => {
  const { data: ld, isLoading, isError } = useGetOccupantLeaseList();

  const leaseList: TOccupantLease[] | null = ld?.data.data ?? null;

  const columns = [
    "Chief Occupant",
    "Deposit (USD)",
    "From",
    "To",
    "Status",
    "Payment Schedule",
    "Apartment",
  ];

  return (
    <Stack p={"xl"}>
      <Title c={"blue.6"}>My Lease History</Title>

      <Stack
        align="stretch"
        bg={"#FFFFFF"}
        p={"xs"}
        style={{ borderRadius: rem(20) }}
      >
        {!leaseList || isError || leaseList?.length == 0 ? (
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
                  leaseList.map((lease, index) => (
                    <Table.Tr key={index + lease._id}>
                      <Table.Td>
                        <TdAvatar
                          occupant={{
                            image: lease.chiefOccupantId.image,
                            fullName: lease.chiefOccupantId.fullName,
                            email: lease.chiefOccupantId.email,
                          }}
                        />
                      </Table.Td>
                      <Table.Td>{lease.securityDepositInUSD} USD</Table.Td>

                      <Table.Td>
                        {dateFormat(lease.startDate, "mmm d, yyyy")}
                      </Table.Td>

                      <Table.Td>
                        {dateFormat(lease.endDate, "mmm d, yyyy")}
                      </Table.Td>

                      <Table.Td>{lease.status}</Table.Td>

                      <Table.Td>{lease.paymentSchedule}</Table.Td>

                      <Table.Td>
                        <Flex gap={"xs"} align={"center"}>
                          <Image
                            radius={"md"}
                            maw={50}
                            mah={50}
                            src={showDefaultImage(
                              lease.apartmentId.images ?? [],
                            )}
                          />
                          <Stack gap={0}>
                            <Text>{lease.apartmentId.identification}</Text>
                            <Text>{lease.apartmentId.class}</Text>
                          </Stack>
                        </Flex>
                      </Table.Td>
                    </Table.Tr>
                  ))
                )}
              </Table.Tbody>
            </Table>
          </>
        )}
      </Stack>
    </Stack>
  );
};
