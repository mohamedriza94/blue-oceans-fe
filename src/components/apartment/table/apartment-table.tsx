import { Badge, Flex, Image, rem, Stack, Table, Text } from "@mantine/core";
import { ApartmentTableSkeleton } from "./table-skeleton";
import { TdActions } from "./data/actions";
import { TableError } from "@/shared/components/table-error";
import { CustomPagination } from "@/shared/components/pagination";
import { TImage } from "@/shared/types/image";
import { showDefaultImage } from "@/shared/utils/show-default-image";

export type TApartment = {
  _id: string;
  buildingId: {
    _id: string;
    buildingName: string;
  };
  telephone: string;
  images?: TImage[];
  description: string;
  identification: string;
  class: "Luxury" | "Standard" | "Studio" | "Penthouse" | "Duplex";
  status: "Available" | "Occupied" | "Maintenance";
};

type TProps = {
  isLoading: boolean;
  isError: boolean;
  apartments: TApartment[];
  paginate: (type: "change-limit" | "paginate", value: number) => void;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

const columns = [
  "Building Name",
  "Apartment No.",
  "Telephone",
  "Class",
  "Status",
  "Actions",
];

export const ApartmentTable = ({
  isLoading,
  isError,
  paginate,
  apartments,
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
                apartments.map((apartment, index) => (
                  <Table.Tr key={index + apartment.identification}>
                    <Table.Td>
                      <Flex gap={"xs"} align={"center"}>
                        <Image
                          radius={"sm"}
                          src={showDefaultImage(apartment.images ?? [])}
                          maw={60}
                          mah={30}
                        />
                        <Text
                          lineClamp={1}
                          title={apartment.buildingId.buildingName}
                        >
                          {apartment.buildingId.buildingName}
                        </Text>
                      </Flex>
                    </Table.Td>

                    <Table.Td>
                      <Text lineClamp={1} title={apartment.identification}>
                        {apartment.identification}
                      </Text>
                    </Table.Td>

                    <Table.Td>
                      <Text lineClamp={1} title={apartment.telephone}>
                        {apartment.telephone}
                      </Text>
                    </Table.Td>

                    <Table.Td>
                      <Text lineClamp={1} title={apartment.class}>
                        {apartment.class}
                      </Text>
                    </Table.Td>

                    <Table.Td>
                      <Text lineClamp={1} title={apartment.status}>
                        {apartment.status}
                      </Text>
                    </Table.Td>

                    {/* Actions */}
                    <Table.Td>
                      <TdActions apartment={apartment} />
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
