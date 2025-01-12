import { rem, Stack, Table } from "@mantine/core";
import { IngredientsSkeleton } from "./table-skeleton";
import { TableError } from "@/shared/components/table-error";
import { isDeletedColor } from "@/shared/utils/is-deleted/is-deleted-color";
import { CustomPagination } from "@/shared/components/pagination";
import { TIngredient } from "../../types/ingredient";
import { TdStatuses } from "./data/statuses";
import { TdName } from "./data/name";
import { TdActions } from "./data/actions";

type IngredientTableProps = {
  isLoading: boolean;
  isError: boolean;
  ingredients: TIngredient[];
  paginate: (type: "change-limit" | "paginate", value: number) => void;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

const columns = ["Name", "Status", "Actions"];

export const IngredientTable = ({
  isLoading,
  isError,
  paginate,
  ingredients,
  pagination,
}: IngredientTableProps) => {
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
                <IngredientsSkeleton />
              ) : (
                ingredients.map((ig, index) => (
                  <Table.Tr
                    key={index + ig.name}
                    bg={isDeletedColor(ig.deletion?.isDeleted)}
                  >
                    {/* Name */}
                    <Table.Td>
                      <TdName name={ig.name} images={ig.images} />
                    </Table.Td>

                    {/* Status */}
                    <Table.Td>
                      <TdStatuses status={ig.isActive} id={ig._id} />
                    </Table.Td>

                    {/* Actions */}
                    <Table.Td>
                      <TdActions ingredient={ig} />
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
