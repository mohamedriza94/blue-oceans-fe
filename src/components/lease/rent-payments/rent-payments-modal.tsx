import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { RefObject } from "react";
import { RentPayments } from "./rent-payments";

type TProps = {
  leaseId: string;
  rentPaymentModalRef: RefObject<{ open: () => void; close: () => void }>;
};

export const RentPaymentsModal = ({ leaseId, rentPaymentModalRef }: TProps) => {
  return (
    <CustomMantineModal
      ref={rentPaymentModalRef}
      centered
      title="Rent Payments"
      styles={{
        title: {
          fontWeight: 600,
        },
      }}
      size={"xl"}
    >
      <RentPayments
        closeModal={() => rentPaymentModalRef.current?.close()}
        leaseId={leaseId}
      />
    </CustomMantineModal>
  );
};
