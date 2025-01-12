import { logos } from "@/shared/constants/general";
import { protectedPaths } from "@/shared/constants/paths";
import { Button, Flex, Image, Text, Title } from "@mantine/core";

export const OtherError = () => {
  return (
    <>
      <Flex justify={"center"} align={"center"} pt={"md"} pb={"md"}>
        <Image src={logos.mainLogoTransparent} w={100} />
      </Flex>

      <Title c={"amaranthRed.5"}>SOMETHING WENT WRONG</Title>
      <Text c={"gray.5"}>
        Sorry for the inconvenience. Something is not sitting right in our
        system.
      </Text>

      <Button component="a" href={protectedPaths.dashboard}>
        Go Home
      </Button>
    </>
  );
};
