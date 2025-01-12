import { TMenuItem } from "@/components/menus/types/menu-item";
import { getIconComponent } from "@/shared/utils/dynamic-render-remix-icons";
import { Avatar, Flex, Stack, Text } from "@mantine/core";

type TdNameProps = {
  name: {
    icon: TMenuItem["icon"];
    label: TMenuItem["label"];
    href: TMenuItem["href"];
  };
};

export const TdName = ({ name }: TdNameProps) => {
  return (
    <Flex align={"center"} gap={"xs"}>
      {getIconComponent(name.icon, { size: 20 })}
      <Stack gap={0}>
        <Text fz={"sm"} fw={500}>
          {name.label}
        </Text>
        <Text fz={"sm"}>{name.href}</Text>
      </Stack>
    </Flex>
  );
};
