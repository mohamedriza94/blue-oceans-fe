import { Skeleton, Stack } from "@mantine/core";

export const MyAccountSkeleton = () => {
  return (
    <Stack align="stretch" justify="flex-start" gap="xs">
      <Stack align="center" justify="flex-start" gap="xs" mt="sm">
        <Skeleton circle w={100} h={100} />
      </Stack>

      <Stack gap="xl" mt="sm">
        <Skeleton h={30} radius={"sm"} />
        <Skeleton h={30} radius={"sm"} />
        <Skeleton h={30} radius={"sm"} />
        <Skeleton h={20} radius={"sm"} />
      </Stack>
    </Stack>
  );
};
