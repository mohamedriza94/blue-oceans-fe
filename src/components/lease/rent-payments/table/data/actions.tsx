import { ActionIcon, Menu } from "@mantine/core";
import { RiMoneyDollarCircleLine, RiMore2Fill } from "@remixicon/react";
import { useRef } from "react";
import { TLeaseItem } from "../../hooks/use-read-leases-api";
import { RentPaymentsModal } from "../../rent-payments/rent-payments-modal";

type TProps = {
  lease: TLeaseItem;
};

export const TdActions = ({ lease }: TProps) => {
  const rentPaymentModalRef = useRef<{ open: () => void; close: () => void }>(
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
            onClick={() => rentPaymentModalRef.current?.open()}
            leftSection={<RiMoneyDollarCircleLine />}
          >
            Rent Payments
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <RentPaymentsModal
        leaseId={lease._id}
        rentPaymentModalRef={rentPaymentModalRef}
      />
    </>
  );
};
