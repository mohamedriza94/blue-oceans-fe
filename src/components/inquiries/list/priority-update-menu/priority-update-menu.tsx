import { Button, Menu, Stack } from "@mantine/core";
import { RiEdit2Line } from "@remixicon/react";
import { useGetInquiryAttributes } from "../../hooks/use-get-inquiry-attributes";
import { getPriorityColor } from "../../utils/get-priority-color";
import { TInquiry } from "../../types/t";

type PriorityUpdateMenuProps = {
  disabled: boolean;
  checkedInquiries: TInquiry["_id"][];
  loading: boolean;
  onPriorityClick: (value: Partial<TInquiry>) => void;
};

export const PriorityUpdateMenu = ({
  checkedInquiries,
  disabled,
  loading,
  onPriorityClick,
}: PriorityUpdateMenuProps) => {
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
          Set Priority
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Stack gap={5}>
          {attributes?.priorities.map((priority, idx) => (
            <Button
              key={idx + "priority"}
              disabled={disabled}
              radius={"sm"}
              size="compact-xs"
              fw={400}
              variant="filled"
              color={getPriorityColor(priority)}
              w={"100%"}
              tt={"capitalize"}
              onClick={() => onPriorityClick({ priority })}
            >
              {priority}
            </Button>
          ))}
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
};
