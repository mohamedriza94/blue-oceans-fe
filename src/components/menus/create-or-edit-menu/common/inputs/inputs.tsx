import { Button, Grid, Group, Switch } from "@mantine/core";
import { CreateMenuLabel } from "./label";
import { CreateMenuHref } from "./hyperlink";
import { CreateMenuAllowedRoles } from "./allowed-roles";
import { CreateMenuDisplayPosition } from "./display-position";
import { CreateMenuDescription } from "./description";
import { TMenuItem } from "@/components/menus/types/menu-item";
import { UseFormReturnType } from "@mantine/form";
import { CreateMenuIcon } from "./icon";
import { RiAddLine, RiDeleteBin3Line } from "@remixicon/react";

type MenuPaths = {
  label: string;
  href: string;
  allowedRoles: string;
  displayPosition: string;
  icon: string;
  description: string;
  isActive: string;
};

type MenuInputsProps = {
  isPending: boolean;
  form: UseFormReturnType<TMenuItem, (values: TMenuItem) => TMenuItem>;
  roles: string[];
  paths: MenuPaths;
  addSubmenu: (index: number | null | undefined) => void;
  removeSubmenu: (index: number) => void;
  index?: number;
};

export const MenuInputs = ({
  isPending,
  form,
  roles,
  paths,
  addSubmenu,
  removeSubmenu,
  index,
}: MenuInputsProps) => {
  return (
    <Grid grow align="end">
      <CreateMenuLabel isPending={isPending} form={form} path={paths.label} />
      <CreateMenuHref isPending={isPending} form={form} path={paths.href} />
      <CreateMenuAllowedRoles
        roles={roles ?? []}
        isPending={isPending}
        form={form}
        path={paths.allowedRoles}
      />
      <CreateMenuIcon isPending={isPending} form={form} path={paths.icon} />
      <CreateMenuDisplayPosition
        isPending={isPending}
        form={form}
        path={paths.displayPosition}
      />
      <CreateMenuDescription
        isPending={isPending}
        form={form}
        path={paths.description}
      />
      <Grid.Col span={8}>
        <Switch
          size="xs"
          label="Active"
          disabled={isPending}
          {...form.getInputProps(paths.isActive, { type: "checkbox" })}
        />
      </Grid.Col>

      <Grid.Col span={4}>
        <Group gap={"xs"} justify="flex-end">
          {index == undefined && (
            <>
              <Button
                size="xs"
                variant="outline"
                onClick={() => addSubmenu(index)}
                leftSection={<RiAddLine />}
                disabled={isPending}
              >
                Add Submenu
              </Button>
            </>
          )}

          {index !== undefined && (
            <Button
              size="xs"
              variant="default"
              onClick={() => removeSubmenu(index)}
              leftSection={<RiDeleteBin3Line />}
              disabled={isPending}
            >
              Remove Submenu
            </Button>
          )}
        </Group>
      </Grid.Col>
    </Grid>
  );
};
