import { TMenuItem } from "@/components/menus/types/menu-item";
import { Grid, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

type CreateMenuLabelProps = {
  isPending: boolean;
  form: UseFormReturnType<TMenuItem, (values: TMenuItem) => TMenuItem>;
  path: string;
};

export const CreateMenuLabel = ({
  isPending,
  form,
  path,
}: CreateMenuLabelProps) => {
  return (
    <Grid.Col span={6}>
      <TextInput
        size="xs"
        placeholder="Enter the label name"
        label="Label"
        withAsterisk
        disabled={isPending}
        key={form.key(path)}
        {...form.getInputProps(path)}
      />
    </Grid.Col>
  );
};
