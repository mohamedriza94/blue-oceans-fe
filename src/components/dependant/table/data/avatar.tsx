import { Avatar, Flex, Stack, Text } from "@mantine/core";
import { TDependant } from "../dependant-table";

export const TdAvatar = ({ dependant }: { dependant: TDependant }) => {
  return (
    <Flex align={"center"} gap={"xs"}>
      <Avatar src={dependant.image} size={"md"} />
      <Stack gap={0}>
        <Text fz={"sm"} fw={500}>
          {dependant.fullName}
        </Text>
        <Text fz={"sm"}>{dependant.email}</Text>
      </Stack>
    </Flex>
  );
};
