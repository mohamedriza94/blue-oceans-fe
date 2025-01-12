import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { Button, Divider, Flex } from "@mantine/core";
import { Stack, Text } from "@mantine/core";
import { RefObject } from "react";
import { TCategory } from "../types/category";
import { useDeleteCategoryApi } from "../hooks/use-delete-category-api";
import { TdName } from "../list-categories/table/data/name";

type DeleteCategoryProps = {
  category: TCategory;
  deleteModalRef: RefObject<{ open: () => void; close: () => void }>;
};

export const DeleteCategory = ({
  category,
  deleteModalRef,
}: DeleteCategoryProps) => {
  const handeCloseModal = () => {
    deleteModalRef.current?.close();
  };

  const { mutate: handleDeleteClick, isPending } = useDeleteCategoryApi({
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
          Are you sure about deleting this Category?
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
