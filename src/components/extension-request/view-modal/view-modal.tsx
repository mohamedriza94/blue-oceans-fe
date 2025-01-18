import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { ExtensionRequestDetails } from "./extension-request-details";
import { ActionIcon } from "@mantine/core";
import { RiEye2Line } from "@remixicon/react";

type TProps = {
  extensionRequestId: string;
};

export const ViewModal = ({ extensionRequestId }: TProps) => {
  return (
    <CustomMantineModal
      customTrigger={
        <ActionIcon variant="transparent">
          <RiEye2Line />
        </ActionIcon>
      }
      centered
      size={"md"}
      title={"Extension Request"}
      styles={{
        title: {
          fontWeight: 600,
        },
      }}
    >
      <ExtensionRequestDetails extensionRequestId={extensionRequestId} />
    </CustomMantineModal>
  );
};
