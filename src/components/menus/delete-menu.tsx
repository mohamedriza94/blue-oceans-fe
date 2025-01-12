import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { Button, Divider, Flex } from "@mantine/core";
import { Stack, Text } from "@mantine/core";
import { RefObject } from "react";
import { TMenuItem } from "./types/menu-item";
import { useDeleteMenuItemApi } from "./hooks/delete-menu/use-delete-menu-api";
import { TdName } from "./list-menu/table/data/name";

type DeleteMenuProps = {
  menuItem: TMenuItem;
  deleteModalRef: RefObject<{ open: () => void; close: () => void }>;
};

export const DeleteMenu = ({ menuItem, deleteModalRef }: DeleteMenuProps) => {
  const handeCloseModal = () => {
    deleteModalRef.current?.close();
  };

  const { mutate: handleDeleteClick, isPending } = useDeleteMenuItemApi({
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
          Are you sure about deleting this menu?
        </Text>

        <Divider w={"100%"} />

        <TdName
          name={{
            href: menuItem.href,
            icon: menuItem.icon,
            label: menuItem.label,
          }}
        />

        <Flex align={"center"} justify={"space-between"} gap={"xs"} mt={"md"}>
          <Button
            onClick={() => handleDeleteClick(menuItem._id)}
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
