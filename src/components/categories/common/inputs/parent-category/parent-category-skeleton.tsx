import { Flex, rem, Skeleton, Stack } from "@mantine/core";

export const ParentCategorySkeleton = () => {
  return (
    <Flex
      align={"center"}
      justify={"flex-start"}
      gap={"xs"}
      mt={"md"}
      style={{
        borderRadius: rem(20),
      }}
      bg={"white"}
    >
      <Skeleton w={200} h={120} radius={"lg"} />

      <Stack gap={5} align="start" justify="flex-start" p={"5"}>
        <Skeleton w={200} h={15} radius={"sm"} />
        <Skeleton w={400} h={15} radius={"sm"} />
        <Skeleton w={60} h={15} radius={"sm"} />
        <Skeleton w={250} h={20} radius={"sm"} />
      </Stack>
    </Flex>
  );
};
