import { Flex, rem, Skeleton, Table } from "@mantine/core";

export const LeasesTableSkeleton = () => {
  const skeletonRows = Array.from({ length: 6 });

  return skeletonRows.map((_) => (
    <Table.Tr>
      <Table.Td>
        <Skeleton h={15} w={150} />
      </Table.Td>

      <Table.Td>
        <Skeleton h={15} w={150} />
      </Table.Td>

      <Table.Td>
        <Skeleton h={15} w={150} />
      </Table.Td>

      <Table.Td>
        <Skeleton h={20} w={20} />
      </Table.Td>

      <Table.Td>
        <Skeleton h={20} w={20} />
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
