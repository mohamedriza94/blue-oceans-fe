import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { CreateExtensionRequest } from "./create-extension-request";
import { Button } from "@mantine/core";
import { TLeaseAgreementData } from "@/components/lease/hooks/create-lease/lease-agreement";

export const CreateExtensionRequestModal = ({
  leaseData,
}: {
  leaseData: TLeaseAgreementData;
}) => {
  return (
    <CustomMantineModal
      centered
      size={"md"}
      customTrigger={
        <Button size="xs" variant="light" color="amaranthRed.5">
          Request Extension
        </Button>
      }
      title="Request Extension"
      styles={{
        title: {
          fontWeight: 600,
        },
      }}
    >
      <CreateExtensionRequest leaseData={leaseData} />
    </CustomMantineModal>
  );
};
