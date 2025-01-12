import { Badge, HoverCard, List, ListItem } from "@mantine/core";

export const TdAllowedRoles = ({ roles }: { roles: string[] }) => {
  return (
    <HoverCard shadow="md" position="right">
      <HoverCard.Target>
        <Badge fz={"sm"} variant="light" color="amaranthRed.5">
          {roles.length}
        </Badge>
      </HoverCard.Target>
      <HoverCard.Dropdown py={2} px={"xs"}>
        <List type="unordered">
          {roles.map((role) => (
            <ListItem fz="sm" tt={"capitalize"}>
              {role}
            </ListItem>
          ))}
        </List>
      </HoverCard.Dropdown>
    </HoverCard>
  );
};
