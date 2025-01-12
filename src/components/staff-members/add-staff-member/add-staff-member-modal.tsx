import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { ActionIcon, Tooltip } from "@mantine/core";
import { RiAddLine } from "@remixicon/react";
import { useRef } from "react";
import { AddStaffMember } from "./add-staff-member";

export const AddStaffMemberModal = () => {
  const addModalRef = useRef<{ open: () => void; close: () => void }>(null);

  return (
    <CustomMantineModal
      ref={addModalRef}
      centered
      size={"sm"}
      title={"Add Staff Member"}
      styles={{
        title: {
          fontWeight: 600,
        },
      }}
      customTrigger={
        <Tooltip label={"Add a Staff Member"}>
          <ActionIcon
            color="amaranthRed.5"
            size={"lg"}
            variant="white"
            radius={"xl"}
          >
            <RiAddLine size={35} />
          </ActionIcon>
        </Tooltip>
      }
    >
      <AddStaffMember closeModal={() => addModalRef.current?.close()} />
    </CustomMantineModal>
  );
};
