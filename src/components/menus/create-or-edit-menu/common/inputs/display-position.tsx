import { TMenuItem } from "@/components/menus/types/menu-item";
import { Grid, NumberInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

type CreateMenuDisplayPositionProps = {
  isPending: boolean;
  form: UseFormReturnType<TMenuItem, (values: TMenuItem) => TMenuItem>;
  path: string;
};

export const CreateMenuDisplayPosition = ({
  isPending,
  form,
  path,
}: CreateMenuDisplayPositionProps) => {
  return (
    <Grid.Col span={4}>
      <NumberInput
        size="xs"
        placeholder="Enter the display position in list"
        label="Display Position"
        disabled={isPending}
        withAsterisk
        key={form.key(path)}
        clampBehavior="strict"
        min={0}
        {...form.getInputProps(path)}
      />
    </Grid.Col>
  );
};
