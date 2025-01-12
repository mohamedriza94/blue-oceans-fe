import { rem, Stack, Table } from "@mantine/core";
import { TStaffMember } from "../../types/staff-member";
import { StaffMemberTableSkeleton } from "./table-skeleton";
import dateFormat from "dateformat";
import { TdRoles } from "./data/roles";
import { Td2FA } from "./data/2fa";
import { TdStatuses } from "./data/statuses";
import { TdAvatar } from "./data/avatar";
import { TdActions } from "./data/actions";
import { TableError } from "@/shared/components/table-error";
import { isDeletedColor } from "@/shared/utils/is-deleted/is-deleted-color";
import { CustomPagination } from "@/shared/components/pagination";

type StaffMemberTableProps = {
  isLoading: boolean;
  isError: boolean;
  staffMembers: TStaffMember[];
  paginate: (type: "change-limit" | "paginate", value: number) => void;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

const columns = ["Avatar", "Status", "Roles", "2FA", "Last Updated", "Actions"];

export const StaffMemberTable = ({
  isLoading,
  isError,
  paginate,
  staffMembers,
  pagination,
}: StaffMemberTableProps) => {
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
                <StaffMemberTableSkeleton />
              ) : (
                staffMembers.map((member, index) => (
                  <Table.Tr
                    key={index + member.email}
                    bg={isDeletedColor(member.deletion?.isDeleted)}
                  >
                    {/* Avatar */}
                    <Table.Td>
                      <TdAvatar member={member} />
                    </Table.Td>

                    {/* Statuses */}
                    <Table.Td>
                      <TdStatuses status={member.status} id={member._id} />
                    </Table.Td>

                    {/* Roles */}
                    <Table.Td>
                      <TdRoles roles={member.roles} />
                    </Table.Td>

                    {/* 2FA */}
                    <Table.Td>
                      <Td2FA
                        twoFactorAuthEnabled={member.twoFactorAuthEnabled}
                      />
                    </Table.Td>

                    {/* Updated At */}
                    <Table.Td>
                      {dateFormat(member.updatedAt, "mediumDate")}
                    </Table.Td>

                    {/* Actions */}
                    <Table.Td>
                      <TdActions member={member} />
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
