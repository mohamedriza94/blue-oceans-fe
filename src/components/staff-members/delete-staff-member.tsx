import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { Button, Divider, Flex } from "@mantine/core";
import { Stack, Text } from "@mantine/core";
import { RefObject } from "react";
import { TdAvatar } from "./list-staff-member/table/data/avatar";
import { TStaffMember } from "./types/staff-member";
import { useDeleteStaffMemberApi } from "./hooks/delete-staff-member/use-delete-staff-member-api";

type DeleteStaffMemberProps = {
  member: TStaffMember;
  deleteModalRef: RefObject<{ open: () => void; close: () => void }>;
};

export const DeleteStaffMember = ({
  member,
  deleteModalRef,
}: DeleteStaffMemberProps) => {
  
  const handeCloseModal = () => {
    deleteModalRef.current?.close();
  };

  const { mutate: handleDeleteClick, isPending } = useDeleteStaffMemberApi({
    closeModal: handeCloseModal,
  });

  return (
    <CustomMantineModal
      ref={deleteModalRef}
      centered
      size={"sm"}
      withCloseButton={false}
    >
      <Stack gap={"sm"} align={"center"}>
        <Text fw={600} fz={"lg"}>
          Confirmation
        </Text>
        <Text fw={400} fz={"md"} c={"gray.5"}>
          Are you sure about deleting this user?
        </Text>

        <Divider w={"100%"} />

        <TdAvatar member={member} />

        <Flex align={"center"} justify={"space-between"} gap={"xs"} mt={"md"}>
          <Button
            onClick={() => handleDeleteClick(member._id)}
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
