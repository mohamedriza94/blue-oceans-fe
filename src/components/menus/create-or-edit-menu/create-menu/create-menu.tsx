import { rem, Stack } from "@mantine/core";
import { CreateMenuForm } from "./create-menu-form";

export const CreateMenuComponent = () => {
  return (
    <Stack
      gap={"xs"}
      align="stretch"
      bg={"#FFFFFF"}
      style={{ borderRadius: rem(20) }}
      p={"lg"}
    >
      <CreateMenuForm />
    </Stack>
  );
};
