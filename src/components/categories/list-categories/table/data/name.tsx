import { TCategory } from "@/components/categories/types/category";
import { showDefaultImage } from "@/shared/utils/show-default-image";
import { Box, Flex, Image, Stack, Text } from "@mantine/core";

type TdNameProps = {
  name: TCategory["name"];
  images: TCategory["images"];
};

export const TdName = ({ name, images }: TdNameProps) => {
  return (
    <Flex align={"center"} gap={"xs"}>
      <Box maw={50} mah={50} style={{ overflow: "hidden" }}>
        <Image
          w={"100%"}
          h={"100%"}
          src={showDefaultImage(images ?? [])}
          radius={"md"}
        />
      </Box>
      <Stack gap={0}>
        <Text fz={"sm"} fw={500}>
          {name}
        </Text>
      </Stack>
    </Flex>
  );
};
