import { TMenuItem } from "@/components/menus/types/menu-item";
import { getIconComponent } from "@/shared/utils/dynamic-render-remix-icons";
import { Badge, Button, HoverCard, List, ListItem, Stack } from "@mantine/core";

type TdSubMenusProps = {
  submenus: {
    icon?: TMenuItem["icon"];
    label: TMenuItem["label"];
    href: TMenuItem["href"];
  }[];
};

export const TdSubMenus = ({ submenus }: TdSubMenusProps) => {
  return (
    <HoverCard shadow="md" position="right" withArrow arrowSize={10}>
      <HoverCard.Target>
        <Badge fz={"sm"} variant="light" color="amaranthRed.5">
          {submenus.length}
        </Badge>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Stack gap={5} align="stretch">
          {submenus.map((submenu, index) => (
            <Button
              size="xs"
              fz="sm"
              tt={"capitalize"}
              key={index + "submenu-floating-view"}
              leftSection={
                submenu.icon && getIconComponent(submenu.icon, { size: 10 })
              }
              variant="subtle"
              component="a"
              href={submenu.href}
              target="_blank"
            >
              {submenu.label}
            </Button>
          ))}
        </Stack>
      </HoverCard.Dropdown>
    </HoverCard>
  );
};
