import { Stack, Text } from "@mantine/core";
import { RiEmotionSadLine } from "@remixicon/react";

export const TableError = () => {
  return (
    <Stack p={"xl"} align={"center"} justify={"center"}>
      <RiEmotionSadLine size={50} color="var(--mantine-color-amaranthRed-5)" />
      <Text c={"amaranthRed.5"} fz={"xl"} fw={600} ta={"center"}>
        Sorry. No Records To Show
      </Text>
    </Stack>
  );
};
