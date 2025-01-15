import { ActionIcon, Menu } from "@mantine/core";
import { RiMoneyDollarCircleLine, RiMore2Fill } from "@remixicon/react";
import { useRef } from "react";
import { TLeaseItem } from "../../hooks/use-read-leases-api";

type TProps = {
  lease: TLeaseItem;
};

export const TdActions = ({ lease }: TProps) => {
  const rentModalRef = useRef<{ open: () => void; close: () => void }>(
    null,
  );

  return (
    <>
      <Menu shadow="md" position="bottom-start" withArrow>
        <Menu.Target>
          <ActionIcon size={"md"} variant="subtle">
            <RiMore2Fill />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            onClick={() => rentModalRef.current?.open()}
            leftSection={<RiMoneyDollarCircleLine />}
          >
            Rent Payments
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};
