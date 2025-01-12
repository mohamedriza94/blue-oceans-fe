import { TMenuItem } from "@/components/menus/types/menu-item";
import { Grid, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

type CreateMenuHrefProps = {
  isPending: boolean;
  form: UseFormReturnType<TMenuItem, (values: TMenuItem) => TMenuItem>;
  path: string;
};

export const CreateMenuHref = ({
  isPending,
  form,
  path,
}: CreateMenuHrefProps) => {
  return (
    <Grid.Col span={6}>
      <TextInput
        size="xs"
        placeholder="Enter the hyperlink path"
        label="Path Name"
        withAsterisk
        disabled={isPending}
        key={form.key(path)}
        {...form.getInputProps(path)}
      />
    </Grid.Col>
  );
};
