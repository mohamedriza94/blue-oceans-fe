import { TIngredient } from "@/components/ingredients/types/ingredient";
import { getIconComponent } from "@/shared/utils/dynamic-render-remix-icons";
import { showDefaultImage } from "@/shared/utils/show-default-image";
import { Flex, Image, Stack, Text } from "@mantine/core";

type TdNameProps = {
  name: TIngredient["name"];
  images: TIngredient["images"];
};

export const TdName = ({ name, images }: TdNameProps) => {
  return (
    <Flex align={"center"} gap={"xs"}>
      <Image maw={50} mah={50} src={showDefaultImage(images ?? [])} />
      <Stack gap={0}>
        <Text fz={"sm"} fw={500}>
          {name}
        </Text>
      </Stack>
    </Flex>
  );
};
