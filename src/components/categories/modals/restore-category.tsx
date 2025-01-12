import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { Button, Divider, Flex } from "@mantine/core";
import { Stack, Text } from "@mantine/core";
import { RefObject } from "react";
import { TdName } from "../list-categories/table/data/name";
import { useRestoreCategoryApi } from "../hooks/use-restore-category-api";
import { TCategory } from "../types/category";

type RestoreCategoryProps = {
  category: TCategory;
  restoreModalRef: RefObject<{ open: () => void; close: () => void }>;
};

export const RestoreCategory = ({
  category,
  restoreModalRef,
}: RestoreCategoryProps) => {
  const handleCloseModal = () => {
    restoreModalRef.current?.close();
  };

  const { mutate: handleDeleteClick, isPending } = useRestoreCategoryApi({
    closeModal: handleCloseModal,
  });

  return (
    <CustomMantineModal
      ref={restoreModalRef}
      centered
      size={"sm"}
      withCloseButton={false}
    >
      <Stack gap={"sm"} align={"center"}>
        <Text fw={600} fz={"lg"}>
          Confirmation
        </Text>
        <Text fw={400} fz={"md"} c={"gray.5"}>
          Are you sure about restoring this Category?
        </Text>

        <Divider w={"100%"} />

        <TdName images={category.images} name={category.name} />

        <Flex align={"center"} justify={"space-between"} gap={"xs"} mt={"md"}>
          <Button
            onClick={() => handleDeleteClick([category._id])}
            size="xs"
            variant="filled"
            loading={isPending}
            disabled={isPending}
          >
            Confirm
          </Button>
          <Button
            onClick={handleCloseModal}
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
