import { CustomMantineDrawer } from "@/shared/components/custom-mantine-drawer";
import { ActionIcon, Box, Flex, rem, Stack, Text } from "@mantine/core";
import { RiMenuLine } from "@remixicon/react";
import { MenuItemsContainer } from "../../sidebar/menu-items";
import { useRouter } from "next/router";
import { unslugText } from "@/shared/utils/unslug";

export const MobileHeader = () => {
  const { pathname } = useRouter();
  const firstPathSegment = unslugText(pathname.split("/")[1]) || "";

  return (
    <Flex
      bg={"#FFFFFF"}
      align={"center"}
      justify={"space-between"}
      gap={"xs"}
      py={"xs"}
      px={"lg"}
      style={{
        borderRadius: `0 0 ${rem(30)} ${rem(30)}`,
      }}
    >
      <CustomMantineDrawer
        radius={"xl"}
        overlayProps={{ backgroundOpacity: 0.04, blur: 3 }}
        // withCloseButton={false}
        position="bottom"
        size={"auto"}
        transitionProps={{
          transition: "fade-up",
          duration: 150,
          timingFunction: "linear",
        }}
        closeButtonProps={{
          style: {
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          },
          icon: (
            <Stack align="center">
              <Box
                w={50}
                component="span"
                style={{
                  borderTop: "2px solid var(--mantine-color-gray-7)",
                }}
              ></Box>
            </Stack>
          ),
        }}
        customTrigger={
          <ActionIcon variant="transparent" color="blue.6">
            <RiMenuLine />
          </ActionIcon>
        }
      >
        <MenuItemsContainer isMinimized={false} />
      </CustomMantineDrawer>

      <Text fw={600} fz={"xl"} c={"blue.6"} tt={"capitalize"}>
        {firstPathSegment}
      </Text>
    </Flex>
  );
};
