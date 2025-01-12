import { TMenuItem } from "@/components/menus/types/menu-item";
import { Grid, Switch } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

type CreateMenuIsActiveProps = {
  isPending: boolean;
  form: UseFormReturnType<TMenuItem, (values: TMenuItem) => TMenuItem>;
  path: string;
};

export const CreateMenuIsActive = ({
  isPending,
  form,
  path,
}: CreateMenuIsActiveProps) => {
  return (
    <Grid.Col span={12}>
      <Switch
        size="xs"
        label="Active"
        disabled={isPending}
        {...form.getInputProps(path, { type: "checkbox" })}
      />
    </Grid.Col>
  );
};
