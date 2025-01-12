import { useEditMenuApi } from "@/components/menus/hooks/edit-menu/use-edit-menu-api";
import { TMenuItem } from "@/components/menus/types/menu-item";
import { Badge, Button, Menu, Stack, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { RiArrowDownSLine } from "@remixicon/react";
import { useState } from "react";

type TdStatusesProps = {
  status: TMenuItem["isActive"];
  id: TMenuItem["_id"];
};

export const TdStatuses = ({ status, id }: TdStatusesProps) => {
  const { mutate, isPending: isUpdating } = useEditMenuApi();
  const [updatingStatus, setUpdatingStatus] = useState<
    TMenuItem["isActive"] | null
  >(null);

  const handleStatusUpdate = (newStatus: TMenuItem["isActive"]) => {
    setUpdatingStatus(newStatus);
    mutate(
      {
        menuId: id,
        data: {
          isActive: newStatus,
        },
      },
      {
        onSuccess: () => {
          notifications.show({
            color: "green.4",
            position: "top-center",
            title: "Status Updated",
            message: "",
          });
        },
        onSettled: () => {
          setUpdatingStatus(null);
        },
      },
    );
  };

  const getStatusProps = (status: TMenuItem["isActive"]) => {
    return status
      ? { color: "green.5", text: "Active" }
      : { color: "amaranthRed.5", text: "Inactive" };
  };

  const statusOptions: TMenuItem["isActive"][] = [true, false];

  return (
    <Menu position="bottom" withArrow>
      <Menu.Target>
        <Badge
          size="sm"
          variant="light"
          color={getStatusProps(status).color}
          rightSection={<RiArrowDownSLine size={15} />}
        >
          {getStatusProps(status).text}
        </Badge>
      </Menu.Target>

      <Menu.Dropdown>
        <Stack align="stretch" gap={rem(5)}>
          {statusOptions.map((statusOption, index) => (
            <Button
              disabled={isUpdating}
              loading={isUpdating && statusOption === updatingStatus}
              size="compact-xs"
              variant="light"
              color={getStatusProps(statusOption).color}
              fw={400}
              radius="sm"
              tt="capitalize"
              key={index}
              onClick={() => handleStatusUpdate(statusOption)}
            >
              Set {getStatusProps(statusOption).text}
            </Button>
          ))}
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
};
