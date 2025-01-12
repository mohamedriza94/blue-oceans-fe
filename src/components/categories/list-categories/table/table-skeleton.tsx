import { Flex, Skeleton, Stack, Table } from "@mantine/core";

export const CategoriesSkeleton = () => {
  const skeletonRows = Array.from({ length: 6 });

  return skeletonRows.map((_) => (
    <Table.Tr>
      <Table.Td>
        <Flex align={"center"} gap={"xs"}>
          <Skeleton w={25} h={25} circle />

          <Stack gap={"xs"}>
            <Skeleton h={10} w={100} />
            <Skeleton h={10} w={200} />
          </Stack>
        </Flex>
      </Table.Td>

      <Table.Td>
        <Skeleton h={20} w={35} circle />
      </Table.Td>

      <Table.Td>
        <Skeleton h={20} w={35} circle />
      </Table.Td>

      <Table.Td>
        <Skeleton h={20} w={35} circle />
      </Table.Td>

      <Table.Td>
        <Skeleton h={20} w={100} circle />
      </Table.Td>

      <Table.Td>
        <Flex gap={"xs"}>
          <Skeleton h={30} w={30} />
          <Skeleton h={30} w={30} />
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));
};
