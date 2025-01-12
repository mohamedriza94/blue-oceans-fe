import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { Button, Divider, Flex } from "@mantine/core";
import { Stack, Text } from "@mantine/core";
import { RefObject } from "react";
import { TMenuItem } from "./types/menu-item";
import { TdName } from "./list-menu/table/data/name";
import { useRestoreMenuItemApi } from "./hooks/restore-menu/use-restore-menu-api";

type RestoreMenuProps = {
  menuItem: TMenuItem;
  restoreModalRef: RefObject<{ open: () => void; close: () => void }>;
};

export const RestoreMenu = ({
  menuItem,
  restoreModalRef,
}: RestoreMenuProps) => {
  const handeCloseModal = () => {
    restoreModalRef.current?.close();
  };

  const { mutate: handleRestoreClick, isPending } = useRestoreMenuItemApi({
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

        <TdName
          name={{
            href: menuItem.href,
            icon: menuItem.icon,
            label: menuItem.label,
          }}
        />

        <Flex align={"center"} justify={"space-between"} gap={"xs"} mt={"md"}>
          <Button
            onClick={() => handleRestoreClick(menuItem._id)}
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
