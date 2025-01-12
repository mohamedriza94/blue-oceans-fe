import { Flex, Skeleton, Stack } from "@mantine/core";

export const MenuItemsSkeleton = () => {
  const skeletonArray = Array.from({ length: 10 }, (_, index) => index);

  return (
    <Stack gap="xs">
      {skeletonArray.map((item) => (
        <Flex key={item} align="center" gap="sm">
          <Skeleton h={30} w={30} />
          <Skeleton h={30} w={"100%"} />
          <Skeleton h={10} w={10} />
        </Flex>
      ))}
    </Stack>
  );
};
