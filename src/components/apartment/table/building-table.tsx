import { Badge, rem, Stack, Table, Text } from "@mantine/core";
import { BuildingTableSkeleton } from "./table-skeleton";
import { TdActions } from "./data/actions";
import { TableError } from "@/shared/components/table-error";
import { CustomPagination } from "@/shared/components/pagination";

export type TBuilding = {
  _id?: string;
  buildingName: string;
  telephone: string;
  address: string;
  parkingSlots: number;
};

type TBuildingWithApartmentCount = TBuilding & {
  apartmentCount: number;
};

type TProps = {
  isLoading: boolean;
  isError: boolean;
  buildings: TBuildingWithApartmentCount[];
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
  "Telephone",
  "Apartments",
  "Parking Slots",
  "Actions",
];

export const BuildingTable = ({
  isLoading,
  isError,
  paginate,
  buildings,
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
                <BuildingTableSkeleton />
              ) : (
                buildings.map((building, index) => (
                  <Table.Tr key={index + building.buildingName}>
                    <Table.Td>
                      <Text lineClamp={1} title={building.buildingName}>
                        {building.buildingName}
                      </Text>
                    </Table.Td>

                    <Table.Td>
                      <Text lineClamp={1} title={building.buildingName}>
                        {building.telephone}
                      </Text>
                    </Table.Td>

                    <Table.Td>
                      <Badge fz={"sm"} variant="light" color="blue.6">
                        {building.apartmentCount ?? 0}
                      </Badge>
                    </Table.Td>

                    <Table.Td>
                      <Badge fz={"sm"} variant="light" color="blue.6">
                        {building.parkingSlots}
                      </Badge>
                    </Table.Td>

                    {/* Actions */}
                    <Table.Td>
                      <TdActions building={building} />
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
