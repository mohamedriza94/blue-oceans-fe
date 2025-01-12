import { createEmptyArray } from "@/shared/utils/create-empty-array";
import { Divider, Flex, Skeleton, Stack } from "@mantine/core";

export const InquiryListSkeleton = () => {
  return (
    <Stack align="stretch" gap={"xs"} p={"sm"} justify="flex-start" flex={1}>
      <Flex justify={"space-between"} gap={"xs"} px={5} align={"center"}>
        <Flex gap={"xs"} align={"center"}>
          <Skeleton w={10} h={10} radius={"sm"} />
          <Skeleton w={100} h={10} radius={"sm"} />
        </Flex>
        <Flex gap={"xs"} align={"center"}>
          <Skeleton w={100} h={20} radius={"sm"} />
          <Skeleton w={100} h={20} radius={"sm"} />
        </Flex>
      </Flex>

      {createEmptyArray(5).map((_, idx, arr) => (
        <>
          <Flex
            align={"center"}
            gap={"xs"}
            p={5}
            key={idx + "inquiry-list-skeleton"}
          >
            <Skeleton w={10} h={10} radius={"sm"} />

            <Stack align="stretch" justify="flex-start" flex={1} gap={5}>
              <Flex align={"center"} justify={"space-between"} gap={"xs"}>
                <Skeleton w={180} h={10} radius={"sm"} />

                <Flex align={"center"} gap={"xs"}>
                  <Skeleton w={50} h={20} radius={"sm"} />
                  <Skeleton w={50} h={20} radius={"sm"} />
                </Flex>
              </Flex>

              <Skeleton w={"80%"} h={10} radius={"sm"} />

              <Skeleton w={200} h={10} radius={"sm"} />
            </Stack>
          </Flex>

          {/* Add Divider only if not the last item */}
          {idx < arr.length - 1 && <Divider />}
        </>
      ))}
    </Stack>
  );
};
