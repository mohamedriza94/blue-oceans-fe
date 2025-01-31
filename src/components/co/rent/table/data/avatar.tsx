import { Avatar, Flex, Stack, Text } from "@mantine/core";

export const TdAvatar = ({ occupant }: { occupant: any }) => {
  return (
    <Flex align={"center"} gap={"xs"}>
      <Avatar src={occupant.image} size={"md"} />
      <Stack gap={0}>
        <Text fz={"sm"} fw={500}>
          {occupant.fullName}
        </Text>
        <Text fz={"sm"}>{occupant.email}</Text>
      </Stack>
    </Flex>
  );
};
