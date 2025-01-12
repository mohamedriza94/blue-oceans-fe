import { useUpdateCategoryStatusApi } from "@/components/categories/hooks/use-update-category-status-api";
import { TCategory } from "@/components/categories/types/category";
import { Badge, Button, Menu, Stack, rem } from "@mantine/core";
import { RiArrowDownSLine } from "@remixicon/react";
import { useState } from "react";

type TdStatusesProps = {
  status: TCategory["isActive"];
  id: TCategory["_id"];
};

export const TdStatuses = ({ status, id }: TdStatusesProps) => {
  const { mutate, isPending: isUpdating } = useUpdateCategoryStatusApi();
  const [updatingStatus, setUpdatingStatus] = useState<
    TCategory["isActive"] | null
  >(null);

  const handleStatusUpdate = (newStatus: TCategory["isActive"]) => {
    setUpdatingStatus(newStatus);
    mutate(
      {
        categoryIDs: [id],
      },
      {
        onSettled: () => {
          setUpdatingStatus(null);
        },
      },
    );
  };

  const getStatusProps = (status: TCategory["isActive"]) => {
    return status
      ? { color: "green.5", text: "Active" }
      : { color: "amaranthRed.5", text: "Inactive" };
  };

  const statusOptions: TCategory["isActive"][] = [status ? false : true];

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
