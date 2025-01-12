import { Badge, NumberFormatter, rem, Stack, Table } from "@mantine/core";
import { CategoriesSkeleton } from "./table-skeleton";
import { TableError } from "@/shared/components/table-error";
import { isDeletedColor } from "@/shared/utils/is-deleted/is-deleted-color";
import { CustomPagination } from "@/shared/components/pagination";
import { TdStatuses } from "./data/statuses";
import { TdName } from "./data/name";
import { TdActions } from "./data/actions";
import { TCategory } from "../../types/category";

type CategoryTableProps = {
  isLoading: boolean;
  isError: boolean;
  categories: TCategory[];
  paginate: (type: "change-limit" | "paginate", value: number) => void;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

const columns = [
  "Name",
  "Blog Count",
  "Recipe Count",
  "Children Count",
  "Status",
  "Actions",
];

export const CategoryTable = ({
  isLoading,
  isError,
  paginate,
  categories,
  pagination,
}: CategoryTableProps) => {
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
                <CategoriesSkeleton />
              ) : (
                categories.map((cat, index) => (
                  <Table.Tr
                    key={index + cat.name}
                    bg={isDeletedColor(cat.deletion?.isDeleted)}
                  >
                    {/* Name */}
                    <Table.Td>
                      <TdName name={cat.name} images={cat.images} />
                    </Table.Td>

                    {/* Blog Count */}
                    <Table.Td>
                      <Badge fz={"sm"} variant="light" color="amaranthRed.5">
                        <NumberFormatter value={10} thousandSeparator />
                      </Badge>
                    </Table.Td>

                    {/* Recipe Count */}
                    <Table.Td>
                      <Badge fz={"sm"} variant="light" color="amaranthRed.5">
                        <NumberFormatter value={10} thousandSeparator />
                      </Badge>
                    </Table.Td>

                    {/* Children Count */}
                    <Table.Td>
                      <Badge fz={"sm"} variant="light" color="amaranthRed.5">
                        <NumberFormatter value={10} thousandSeparator />
                      </Badge>
                    </Table.Td>

                    {/* Status */}
                    <Table.Td>
                      <TdStatuses status={cat.isActive} id={cat._id} />
                    </Table.Td>

                    {/* Actions */}
                    <Table.Td>
                      <TdActions category={cat} />
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
