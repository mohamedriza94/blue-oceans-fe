import { Button, Menu, Stack } from "@mantine/core";
import { RiEdit2Line } from "@remixicon/react";
import { useGetInquiryAttributes } from "../../hooks/use-get-inquiry-attributes";
import { TInquiry } from "../../types/t";
import { getStatusColor } from "../../utils/get-status-color";

type StatusUpdateMenuProps = {
  disabled: boolean;
  checkedInquiries: TInquiry["_id"][];
  loading: boolean;
  onStatusClick: (value: Partial<TInquiry>) => void;
};

export const StatusUpdateMenu = ({
  checkedInquiries,
  disabled,
  loading,
  onStatusClick,
}: StatusUpdateMenuProps) => {
  const { data: attributes } = useGetInquiryAttributes();

  return (
    <Menu shadow="md" withArrow offset={2} arrowSize={10}>
      <Menu.Target>
        <Button
          variant="outline"
          size="compact-xs"
          color="gray.6"
          leftSection={<RiEdit2Line size={15} />}
          disabled={disabled || loading}
          loading={loading}
        >
          Set Status
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Stack gap={5}>
          {attributes?.statuses.map((status, idx) => (
            <Button
              key={idx + "status"}
              disabled={disabled}
              radius={"sm"}
              size="compact-xs"
              fw={400}
              variant="filled"
              color={getStatusColor(status)}
              w={"100%"}
              tt={"capitalize"}
              onClick={() => onStatusClick({ status })}
            >
              {status}
            </Button>
          ))}
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
};
