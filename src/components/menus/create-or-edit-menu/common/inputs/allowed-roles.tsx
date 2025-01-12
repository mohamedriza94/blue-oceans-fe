import { TMenuItem } from "@/components/menus/types/menu-item";
import { Grid, MultiSelect } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

type CreateMenuAllowedRolesProps = {
  isPending: boolean;
  form: UseFormReturnType<TMenuItem, (values: TMenuItem) => TMenuItem>;
  roles: string[];
  path: string;
};

export const CreateMenuAllowedRoles = ({
  isPending,
  form,
  roles,
  path,
}: CreateMenuAllowedRolesProps) => {
  return (
    <Grid.Col span={4}>
      <MultiSelect
        size="xs"
        placeholder="Who can access this menu?"
        label="Allowed Roles"
        withAsterisk
        data={
          roles.map((role) => ({
            value: role,
            label: role.charAt(0).toUpperCase() + role.slice(1),
          })) ?? []
        }
        disabled={isPending}
        key={form.key(path)}
        {...form.getInputProps(path)}
      />
    </Grid.Col>
  );
};
