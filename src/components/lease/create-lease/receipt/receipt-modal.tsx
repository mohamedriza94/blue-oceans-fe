import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { TLeaseAgreementData } from "../../hooks/create-lease/lease-agreement";
import { Receipt } from "./receipt";
import { useEffect, useState } from "react";

type TProps = {
  leaseData: TLeaseAgreementData | null;
  isSuccess: boolean;
};

export const ReceiptModal = ({ isSuccess, leaseData }: TProps) => {
  const [isOpen, setIsOpen] = useState(isSuccess);

  useEffect(() => {
    if (isSuccess) setIsOpen(true);
  }, [isSuccess]);

  return (
    <CustomMantineModal
      opened={isOpen}
      onClose={() => setIsOpen(false)}
      centered
      size={"100%"}
    >
      <Receipt leaseData={leaseData} />
    </CustomMantineModal>
  );
};
