import { TMenuItem } from "@/components/menus/types/menu-item";
import { Grid, Textarea } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

type CreateMenuDescriptionProps = {
  isPending: boolean;
  form: UseFormReturnType<TMenuItem, (values: TMenuItem) => TMenuItem>;
  path: string;
};

export const CreateMenuDescription = ({
  isPending,
  form,
  path,
}: CreateMenuDescriptionProps) => {
  return (
    <Grid.Col span={12}>
      <Textarea
        size="xs"
        placeholder="Enter a description"
        label="Description"
        disabled={isPending}
        key={form.key(path)}
        {...form.getInputProps(path)}
      />
    </Grid.Col>
  );
};
