import { useEditStaffMemberApi } from "@/components/staff-members/hooks/edit-staff-member/use-edit-staff-member-api";
import { useGetStaffMemberAttributes } from "@/components/staff-members/hooks/use-get-staff-member-attributes";
import { TStaffMember } from "@/components/staff-members/types/staff-member";
import { Badge, Button, Menu, rem, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { RiArrowDownSLine } from "@remixicon/react";
import { useState } from "react";

type TdStatusesProps = {
  status: TStaffMember["status"];
  id: TStaffMember["_id"];
};

export const TdStatuses = ({ status, id }: TdStatusesProps) => {
  const { data } = useGetStaffMemberAttributes();
  const { mutate, isPending: isUpdating } = useEditStaffMemberApi();
  const [updatingStatus, setUpdatingStatus] = useState<
    TStaffMember["status"] | null
  >(null);

  const handleStatusUpdate = (newStatus: TStaffMember["status"]) => {
    setUpdatingStatus(newStatus);
    mutate(
      {
        staffMemberId: id,
        data: {
          status: newStatus,
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

  const getStatusProps = (status: TStaffMember["status"]) => {
    let color = "";
    let variant = "light";

    switch (status) {
      case "active":
        color = "green.5";
        break;
      case "inactive":
        color = "amaranthRed.5";
        break;
      case "suspended":
        color = "amaranthRed.5";
        variant = "filled";
        break;
    }

    return { color, variant };
  };

  return (
    <Menu position="bottom" withArrow>
      <Menu.Target>
        <Badge
          size="sm"
          variant={getStatusProps(status).variant}
          color={getStatusProps(status).color}
          rightSection={<RiArrowDownSLine size={15} />}
        >
          {status}
        </Badge>
      </Menu.Target>

      <Menu.Dropdown>
        <Stack align="stretch" gap={rem(5)}>
          {data?.statuses.map((statusOption, index) => (
            <Button
              disabled={isUpdating}
              loading={isUpdating && statusOption === updatingStatus}
              size="compact-xs"
              variant={getStatusProps(statusOption).variant}
              color={getStatusProps(statusOption).color}
              fw={400}
              radius={"sm"}
              tt={"capitalize"}
              key={index + statusOption}
              onClick={() => handleStatusUpdate(statusOption)}
            >
              Set {statusOption}
            </Button>
          ))}
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
};
