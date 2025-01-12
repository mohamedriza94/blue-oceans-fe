import IconPickerModal from "@/components/menus/icon-picker-modal/icon-picker-modal";
import { TMenuItem } from "@/components/menus/types/menu-item";
import { getIconComponent } from "@/shared/utils/dynamic-render-remix-icons";
import { ActionIcon, Grid, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { RiArrowRightUpBoxLine } from "@remixicon/react";
import { useRef, useState } from "react";

type CreateMenuIconProps = {
  isPending: boolean;
  form: UseFormReturnType<TMenuItem, (values: TMenuItem) => TMenuItem>;
  path: string;
};

export const CreateMenuIcon = ({
  isPending,
  form,
  path,
}: CreateMenuIconProps) => {
  const iconPickerModalRef = useRef<{ open: () => void; close: () => void }>(
    null,
  );
  const [icon, setIcon] = useState("");

  const handleIconSelect = (selectedIcon: string) => {
    setIcon(selectedIcon);
    form.setFieldValue(path, selectedIcon);
  };

  return (
    <Grid.Col span={4}>
      <TextInput
        size="xs"
        placeholder="Choose an Icon"
        label="Icon"
        disabled={isPending}
        readOnly
        leftSection={getIconComponent(icon || form.getInputProps(path).value, {
          size: 20,
        })}
        onClick={() => iconPickerModalRef.current?.open()}
        {...form.getInputProps(path)}
        key={form.key(path)}
        styles={{
          input: {
            cursor: "pointer",
          },
        }}
        rightSection={
          <>
            <ActionIcon
              radius={"xl"}
              disabled={isPending}
              variant="transparent"
              title="Choose Icon"
            >
              <RiArrowRightUpBoxLine size={25} />
            </ActionIcon>

            <IconPickerModal
              iconPickerModalRef={iconPickerModalRef}
              setIcon={handleIconSelect}
            />
          </>
        }
      />
    </Grid.Col>
  );
};
