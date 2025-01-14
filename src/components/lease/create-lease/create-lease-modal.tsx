import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { ActionIcon } from "@mantine/core";
import { RiAddLine } from "@remixicon/react";
import { CreateLease } from "./create-lease";

export const CreateLeaseModal = () => {
  return (
    <CustomMantineModal
      size={"100%"}
      title="New Lease Agreement"
      styles={{
        title: {
          fontWeight: 600,
        },
      }}
      centered
      customTrigger={
        <ActionIcon variant="transparent">
          <RiAddLine />
        </ActionIcon>
      }
    >
      <CreateLease />
    </CustomMantineModal>
  );
};
