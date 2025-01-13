import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { Button, Divider, Flex } from "@mantine/core";
import { Stack, Text } from "@mantine/core";
import { RefObject } from "react";
import { TDependant } from "./table";
import { useDeleteDependantApi } from "./hooks/use-delete-dependant-api";
import { TdAvatar } from "./table/data/avatar";

type TProps = {
  dependant: TDependant;
  deleteModalRef: RefObject<{ open: () => void; close: () => void }>;
};

export const DeleteDependantModal = ({ dependant, deleteModalRef }: TProps) => {
  const handeCloseModal = () => {
    deleteModalRef.current?.close();
  };

  const { mutate: handleDeleteClick, isPending } = useDeleteDependantApi({
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
          Are you sure about deleting this dependant?
        </Text>

        <Divider w={"100%"} />

        <TdAvatar dependant={dependant} />

        <Flex align={"center"} justify={"space-between"} gap={"xs"} mt={"md"}>
          <Button
            onClick={() => handleDeleteClick(dependant._id)}
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
