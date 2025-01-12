import { logos } from "@/shared/constants/general";
import { protectedPaths } from "@/shared/constants/paths";
import { Button, Flex, Image, Text, Title } from "@mantine/core";

export const PageNotFoundError = () => {
  return (
    <>
      <Flex justify={"center"} align={"center"} pt={"md"} pb={"md"}>
        <Image src={logos.mainLogoTransparent} w={100} />
      </Flex>

      <Title c={"amaranthRed.5"}>404. PAGE NOT FOUND</Title>
      <Text c={"gray.5"}>
        You seemed to have tried to access a page that doesn't exist
      </Text>

      <Button component="a" href={protectedPaths.dashboard.path}>
        Go Home
      </Button>
    </>
  );
};
