import { Flex, Image, rem, Stack, Text } from "@mantine/core";
import classes from "./styles.module.scss";
import { currentYear, logos } from "@/shared/constants/general";

type AuthenticationLayoutProps = {
  children: React.ReactNode;
};

export const AuthenticationLayout = ({
  children,
}: AuthenticationLayoutProps) => {
  return (
    <Stack w={"100%"} h={"100vh"} align={"center"} bg={"amaranthRed.5"}>
      <Stack h={"100%"} align={"stretch"} justify={"space-between"}>
        {/* Header */}
        <Flex
          justify={"center"}
          align={"center"}
          className={classes.header}
          pt={"md"}
          pb={"md"}
        >
          <Image src={logos.mainLogoTransparent} w={100} />
        </Flex>

        {/* Content */}
        {children}

        {/* Footer */}
        <Flex
          justify={"center"}
          align={"center"}
          className={classes.footer}
          px={"md"}
          pt={rem(8)}
          pb={rem(2)}
        >
          <Text fw={500} fz={"xs"}>
            &copy; {currentYear} {"Savor Spree. All Rights Reserved"}
          </Text>
        </Flex>
      </Stack>
    </Stack>
  );
};
