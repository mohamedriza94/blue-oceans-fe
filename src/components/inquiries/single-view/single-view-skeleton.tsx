import { Divider, Flex, List, Skeleton, Stack } from "@mantine/core";

export const SingleViewSkeleton = () => {
  return (
    <Stack align="stretch" gap={5} p={"sm"} justify="flex-start" w={"50%"}>
      <Flex justify={"space-between"} gap={"xs"}>
        <Skeleton w={15} h={15} radius={"sm"} />
        <Flex align={"center"} gap={"xs"}>
          <Skeleton w={50} h={15} radius={"md"} />
          <Skeleton w={50} h={15} radius={"md"} />
        </Flex>
      </Flex>

      <Stack align="start" justify="start" gap={5}>
        <Skeleton w={150} h={10} radius={"sm"} />
        <List spacing={5} size="sm" c={"gray.5"}>
          <List.Item icon={<Skeleton w={13} h={13} radius={"sm"} />}>
            <Skeleton w={150} h={10} radius={"sm"} />
          </List.Item>
          <List.Item icon={<Skeleton w={13} h={13} radius={"sm"} />}>
            <Skeleton w={150} h={10} radius={"sm"} />
          </List.Item>
          <List.Item icon={<Skeleton w={13} h={13} radius={"sm"} />}>
            <Skeleton w={150} h={10} radius={"sm"} />
          </List.Item>
        </List>
      </Stack>

      <Divider />

      <Flex justify={"space-between"} gap={"xs"}>
        <Skeleton w={100} h={10} radius={"sm"} />
        <Skeleton w={100} h={10} radius={"sm"} />
      </Flex>

      <Divider />

      <Stack align="stretch" justify="start" gap={5}>
        <Skeleton w={100} h={15} radius={"sm"} />

        <Stack align="stretch" justify="start" gap={3}>
          <Skeleton w={100} h={10} radius={"sm"} />
          <Skeleton w={100} h={10} radius={"sm"} />
          <Skeleton w={100} h={10} radius={"sm"} />
        </Stack>
      </Stack>

      <Divider />

      <Stack align="stretch" justify="start" gap={5}>
        <Skeleton w={100} h={15} radius={"sm"} />

        <Stack align="stretch" justify="start" gap={3}>
          <Skeleton w={100} h={10} radius={"sm"} />
          <Skeleton w={100} h={10} radius={"sm"} />
          <Skeleton w={100} h={10} radius={"sm"} />
        </Stack>
      </Stack>

      <Divider />

      <Stack align="stretch" justify="start" gap={5}>
        <Skeleton w={100} h={15} radius={"sm"} />

        <Stack align="stretch" justify="start" gap={3}>
          <Skeleton w={100} h={10} radius={"sm"} />
          <Skeleton w={100} h={10} radius={"sm"} />
          <Skeleton w={100} h={10} radius={"sm"} />
        </Stack>
      </Stack>

      <Flex flex={1} align={"end"}>
        <Skeleton w={120} h={20} radius={"sm"} />
      </Flex>
    </Stack>
  );
};
