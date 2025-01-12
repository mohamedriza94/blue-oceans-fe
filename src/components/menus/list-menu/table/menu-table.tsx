import { rem, Stack, Table } from "@mantine/core";
import { MenuTableSkeleton } from "./table-skeleton";
import { TMenuItem } from "../../types/menu-item";
import { TableError } from "@/shared/components/table-error";
import { TdAllowedRoles } from "./data/allowed-roles";
import { TdStatuses } from "./data/statuses";
import { TdName } from "./data/name";
import { TdSubMenus } from "./data/sub-menus";
import { TdDisplayPosition } from "./data/display-position";
import { isDeletedColor } from "@/shared/utils/is-deleted/is-deleted-color";
import { CustomPagination } from "@/shared/components/pagination";
import { TdActions } from "./data/actions";

type MenuTableTableProps = {
  isLoading: boolean;
  isError: boolean;
  menus: TMenuItem[];
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
  "Status",
  "Sub-Menus",
  "Display Position",
  "Allowed Roles",
  "Actions",
];

export const MenuTable = ({
  isLoading,
  isError,
  paginate,
  menus,
  pagination,
}: MenuTableTableProps) => {
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
                <MenuTableSkeleton />
              ) : (
                menus.map((menu, index) => (
                  <Table.Tr
                    key={index + menu.href}
                    bg={isDeletedColor(menu.deletion?.isDeleted)}
                  >
                    {/* Name */}
                    <Table.Td>
                      <TdName
                        name={{
                          href: menu.href,
                          icon: menu.icon,
                          label: menu.label,
                        }}
                      />
                    </Table.Td>

                    {/* Status */}
                    <Table.Td>
                      <TdStatuses status={menu.isActive} id={menu._id} />
                    </Table.Td>

                    {/* Sub Menus */}
                    <Table.Td>
                      <TdSubMenus submenus={menu.submenus ?? []} />
                    </Table.Td>

                    {/* Display Position */}
                    <Table.Td>
                      <TdDisplayPosition
                        displayPosition={menu.displayPosition}
                      />
                    </Table.Td>

                    {/* Allowed Roles */}
                    <Table.Td>
                      <TdAllowedRoles roles={menu.allowedRoles ?? []} />
                    </Table.Td>

                    {/* Actions */}
                    <Table.Td>
                      <TdActions menuItem={menu} />
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
