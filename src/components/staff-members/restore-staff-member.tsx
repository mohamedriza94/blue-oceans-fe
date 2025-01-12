import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { Button, Divider, Flex } from "@mantine/core";
import { Stack, Text } from "@mantine/core";
import { RefObject } from "react";
import { TdAvatar } from "./list-staff-member/table/data/avatar";
import { TStaffMember } from "./types/staff-member";
import { useRestoreStaffMemberApi } from "./hooks/restore-staff-member/use-restore-staff-member-api";

type RestoreStaffMemberProps = {
  member: TStaffMember;
  restoreModalRef: RefObject<{ open: () => void; close: () => void }>;
};

export const RestoreStaffMember = ({
  member,
  restoreModalRef,
}: RestoreStaffMemberProps) => {
  const handeCloseModal = () => {
    restoreModalRef.current?.close();
  };

  const { mutate: handleRestoreClick, isPending } = useRestoreStaffMemberApi({
    closeModal: handeCloseModal,
  });

  return (
    <CustomMantineModal
      ref={restoreModalRef}
      centered
      size={"sm"}
      withCloseButton={false}
    >
      <Stack gap={"sm"} align={"center"}>
        <Text fw={500} fz={"sm"}>
          Confirm Restoration
        </Text>

        <Divider w={"100%"} />

        <TdAvatar member={member} />

        <Flex align={"center"} justify={"space-between"} gap={"xs"} mt={"md"}>
          <Button
            onClick={() => handleRestoreClick(member._id)}
            size="xs"
            variant="filled"
            loading={isPending}
            disabled={isPending}
          >
            Confirm
          </Button>
          <Button
            onClick={handeCloseModal}
            size="xs"
            variant="default"
            disabled={isPending}
          >
            Cancel
          </Button>
        </Flex>
      </Stack>
    </CustomMantineModal>
  );
};
