import { Flex, rem, Skeleton, Stack, Table } from "@mantine/core";

export const StaffMemberTableSkeleton = () => {
  const skeletonRows = Array.from({ length: 6 });

  return skeletonRows.map((_) => (
    <Table.Tr>
      <Table.Td>
        <Flex align={"center"} gap={"xs"}>
          <Skeleton circle w={45} h={45} animate />

          <Stack gap={"xs"}>
            <Skeleton h={rem(10)} w={rem(120)} />
            <Skeleton h={rem(8)} w={rem(100)} />
          </Stack>
        </Flex>
      </Table.Td>

      <Table.Td>
        <Skeleton h={rem(20)} w={rem(60)} />
      </Table.Td>

      <Table.Td>
        <Skeleton h={rem(10)} w={rem(15)} />
      </Table.Td>

      <Table.Td>
        <Skeleton h={rem(20)} w={rem(60)} />
      </Table.Td>

      <Table.Td>
        <Skeleton h={rem(20)} w={rem(80)} />
      </Table.Td>

      <Table.Td>
        <Flex gap={"xs"}>
          <Skeleton h={rem(30)} w={rem(30)} />
          <Skeleton h={rem(30)} w={rem(30)} />
          <Skeleton h={rem(30)} w={rem(30)} />
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));
};
