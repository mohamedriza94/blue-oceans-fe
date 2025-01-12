import { useUserStore } from "@/shared/stores/user-store";
import { useUserTypeStore } from "@/shared/stores/user-type-store";
import { unslugText } from "@/shared/utils/unslug";
import { Avatar, Flex, Menu, rem, Stack, Text } from "@mantine/core";
import { RiArrowDownSLine } from "@remixicon/react";

type MenuTargetProps = {
  isDesktop: boolean;
};

export const MenuTarget = ({ isDesktop }: MenuTargetProps) => {
  const { user } = useUserStore();
  const { userType } = useUserTypeStore();

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
          src={user?.fullName}
          alt="it's me"
          size={isDesktop ? "sm" : "md"}
          color="blue.6"
        />

        {isDesktop ? (
          <>
            <Stack gap={rem(0)} justify="center">
              <Text c={"gray.8"} size={"xs"} fw={600}>
                {user?.fullName}
              </Text>
              <Text c={"gray.8"} size={"xs"} fw={400} tt={"capitalize"}>
                {unslugText(userType ?? "")}
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
