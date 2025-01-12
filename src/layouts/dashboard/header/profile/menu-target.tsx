import { useStaffMemberStore } from "@/shared/stores/staff-member-store";
import { Avatar, Flex, Menu, rem, Stack, Text } from "@mantine/core";
import { RiArrowDownSLine } from "@remixicon/react";

type MenuTargetProps = {
  isDesktop: boolean;
};

export const MenuTarget = ({ isDesktop }: MenuTargetProps) => {
  const { staffMember } = useStaffMemberStore();

  return (
    <Menu.Target>
      <Flex
        align={"center"}
        gap={"xs"}
        style={{
          cursor: "pointer",
        }}
      >
        <Avatar
          src={staffMember?.avatar}
          alt="it's me"
          size={isDesktop ? "sm" : "md"}
          color="amaranthRed.6"
        />

        {isDesktop ? (
          <>
            <Stack gap={rem(0)} justify="center">
              <Text c={"gray.8"} size={"xs"} fw={600}>
                {staffMember?.fullName}
              </Text>
              <Text c={"gray.8"} size={"xs"} fw={400} tt={"capitalize"}>
                {staffMember?.roles.join(" | ")}
              </Text>
            </Stack>
            <RiArrowDownSLine />
          </>
        ) : (
          ""
        )}
      </Flex>
    </Menu.Target>
  );
};
