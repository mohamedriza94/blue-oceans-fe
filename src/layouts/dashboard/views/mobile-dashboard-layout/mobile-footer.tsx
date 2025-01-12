import { Box, Flex, Image, rem } from "@mantine/core";
import { Notifications } from "../../header/notifications";
import { logos } from "@/shared/constants/general";
import { Profile } from "../../header/profile";

export const MobileFooter = () => {
  return (
    <Flex
      bg={"#FFFFFF"}
      align={"end"}
      justify={"space-between"}
      gap={"xs"}
      py={"xs"}
      px={"lg"}
      style={{
        borderRadius: `${rem(30)} ${rem(30)} 0 0 `,
      }}
    >
      <Notifications />

      <Box>
        <Image src={logos.symbolOnlyTransparent} w={35} />
      </Box>

      <Profile />
    </Flex>
  );
};
