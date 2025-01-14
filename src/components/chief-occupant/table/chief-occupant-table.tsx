import { rem, Stack, Table, Text } from "@mantine/core";
import { TdActions } from "./data/actions";
import { TableError } from "@/shared/components/table-error";
import { CustomPagination } from "@/shared/components/pagination";
import { ChiefOccupantTableSkeleton } from "./table-skeleton";
import { TdAvatar } from "./data/avatar";
import { TImage } from "@/shared/types/image";

export type TChiefOccupant = {
  _id: string;
  apartmentId: {
    _id: string;
    identification: string;
    class: "Luxury" | "Standard" | "Studio" | "Penthouse" | "Duplex";
    status: "Available" | "Occupied" | "Maintenance";
    buildingId: string;
    telephone: string;
    images?: TImage[];
    description: string;
  };
  image: string;
  fullName: string;
  contactNumber: string;
  email: string;
  password: string;
  moveInDate?: Date;
  status?: "Active" | "Inactive";
};

type TProps = {
  isLoading: boolean;
  isError: boolean;
  chiefOccupants: TChiefOccupant[];
  paginate: (type: "change-limit" | "paginate", value: number) => void;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

const columns = ["Apartment", "Name", "Status", "Contact Number", "Actions"];

export const ChiefOccupantTable = ({
  isLoading,
  isError,
  paginate,
  chiefOccupants,
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
                <ChiefOccupantTableSkeleton />
              ) : (
                chiefOccupants.map((occupant, index) => (
                  <Table.Tr key={index + occupant.apartmentId._id}>
                    <Table.Td>
                      <Text
                        lineClamp={1}
                        title={occupant.apartmentId.identification}
                      >
                        {occupant.apartmentId.identification}
                      </Text>
                    </Table.Td>

                    <Table.Td>
                      <TdAvatar occupant={occupant} />
                    </Table.Td>

                    <Table.Td>
                      <Text lineClamp={1} title={occupant.status}>
                        {occupant.status}
                      </Text>
                    </Table.Td>

                    <Table.Td>
                      <Text lineClamp={1} title={occupant.contactNumber}>
                        {occupant.contactNumber}
                      </Text>
                    </Table.Td>

                    {/* Actions */}
                    <Table.Td>
                      <TdActions occupant={occupant} />
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
