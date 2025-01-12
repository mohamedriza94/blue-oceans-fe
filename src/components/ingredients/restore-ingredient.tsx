import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { Button, Divider, Flex } from "@mantine/core";
import { Stack, Text } from "@mantine/core";
import { RefObject } from "react";
import { TIngredient } from "./types/ingredient";
import { TdName } from "./list-ingredients/table/data/name";
import { useRestoreIngredientApi } from "./hooks/use-restore-ingredient-api";

type RestoreIngredientProps = {
  ingredient: TIngredient;
  restoreModalRef: RefObject<{ open: () => void; close: () => void }>;
};

export const RestoreIngredient = ({
  ingredient,
  restoreModalRef,
}: RestoreIngredientProps) => {
  const handleCloseModal = () => {
    restoreModalRef.current?.close();
  };

  const { mutate: handleDeleteClick, isPending } = useRestoreIngredientApi({
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
          Are you sure about restoring this Ingredient?
        </Text>

        <Divider w={"100%"} />

        <TdName images={ingredient.images} name={ingredient.name} />

        <Flex align={"center"} justify={"space-between"} gap={"xs"} mt={"md"}>
          <Button
            onClick={() => handleDeleteClick([ingredient._id])}
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
