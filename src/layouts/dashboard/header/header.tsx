import { logos } from "@/shared/constants/general";
import { ActionIcon, Box, Burger, Flex, Image, rem, Text } from "@mantine/core";
import { Notifications } from "./notifications";
import { FullScreenToggle } from "./fullscreen-toggle";
import { Profile } from "./profile";
import Link from "next/link";
import { protectedPaths } from "@/shared/constants/paths";
import { useRouter } from "next/router";
import { unslugText } from "@/shared/utils/unslug";
import { RiCloseLine, RiMenuLine } from "@remixicon/react";
import { SetStateAction } from "react";

type DashboardHeaderProps = {
  toggleMinimized: (value?: SetStateAction<boolean> | undefined) => void;
  isMinimized: boolean;
};

export const DashboardHeader = ({
  isMinimized,
  toggleMinimized,
}: DashboardHeaderProps) => {
  const { pathname } = useRouter();
  const firstPathSegment = unslugText(pathname.split("/")[1]) || "";

  const sidePadding = "xs";

  return (
    <Flex justify={"space-between"} align={"center"} gap={0} h={"100%"}>
      {/* Left Box */}
      <Flex
        align={"center"}
        justify={"space-between"}
        w={rem(200)}
        px={sidePadding}
      >
        <Box component={Link} passHref href={protectedPaths.dashboard}>
          <Image src={logos.mainLogoTransparent} h={35} />
        </Box>

        <Burger
          size="sm"
          lineSize={"3"}
          color="amaranthRed.5"
          opened={isMinimized}
          onClick={() => toggleMinimized()}
        />
      </Flex>

      {/* Right Box */}
      <Flex
        align={"center"}
        justify={"space-between"}
        flex={1}
        pr={sidePadding}
      >
        <Text fw={700} fz={"h3"} c={"amaranthRed.5"} tt={"capitalize"}>
          {firstPathSegment}
        </Text>

        <Flex align={"center"} justify={"center"} gap={"xs"}>
          <FullScreenToggle />
          <Notifications />

          <Profile />
        </Flex>
      </Flex>
    </Flex>
  );
};
