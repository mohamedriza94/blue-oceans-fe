import { TMenuItem } from "@/components/menus/types/menu-item";
import { Button, Group } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

type CreateMenuLabelProps = {
  isPending: boolean;
  form: UseFormReturnType<TMenuItem, (values: TMenuItem) => TMenuItem>;
};

export const CreateMenuActionButtons = ({
  isPending,
  form,
}: CreateMenuLabelProps) => {
  return (
    <Group justify="flex-end">
      <Button
        type="button"
        variant="default"
        size="sm"
        disabled={isPending}
        onClick={() => form.reset()}
      >
        Clear
      </Button>
      <Button
        type="submit"
        variant="filled"
        size="sm"
        disabled={isPending}
        loading={isPending}
      >
        Submit
      </Button>
    </Group>
  );
};
