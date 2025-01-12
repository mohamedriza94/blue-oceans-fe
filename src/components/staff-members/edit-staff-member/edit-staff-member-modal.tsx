import { RefObject } from "react";
import { TStaffMember } from "../types/staff-member";
import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { EditStaffMember } from "./edit-staff-member";

type EditStaffMemberModalProps = {
  member: TStaffMember;
  updateModalRef: RefObject<{ open: () => void; close: () => void }>;
};

export const EditStaffMemberModal = ({
  member,
  updateModalRef,
}: EditStaffMemberModalProps) => {
  return (
    <CustomMantineModal
      ref={updateModalRef}
      centered
      size={"sm"}
      title={"Edit Staff Member"}
      styles={{
        title: {
          fontWeight: 600,
        },
      }}
    >
      <EditStaffMember
        member={member}
        closeModal={() => updateModalRef.current?.close()}
      />
    </CustomMantineModal>
  );
};
