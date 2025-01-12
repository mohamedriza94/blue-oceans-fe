import { Avatar, Flex, Stack, Text } from "@mantine/core";
import { TStaffMember } from "../../../types/staff-member";

export const TdAvatar = ({ member }: { member: TStaffMember }) => {
  return (
    <Flex align={"center"} gap={"xs"}>
      <Avatar src={member.avatar} size={"md"} />
      <Stack gap={0}>
        <Text fz={"sm"} fw={500}>
          {member.fullName}
        </Text>
        <Text fz={"sm"}>{member.email}</Text>
      </Stack>
    </Flex>
  );
};
