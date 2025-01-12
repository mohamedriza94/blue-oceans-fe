import { RefObject } from "react";
import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { TIngredient } from "../types/ingredient";
import { EditIngredientFetchingPhase } from "./edit-ingredient-fetching-phase";

type EditIngredientModalProps = {
  ingredientId: TIngredient["_id"];
  updateModalRef: RefObject<{ open: () => void; close: () => void }>;
};

export const EditIngredientModal = ({
  ingredientId,
  updateModalRef,
}: EditIngredientModalProps) => {
  return (
    <CustomMantineModal
      ref={updateModalRef}
      centered
      size={"100%"}
      title={"Edit Ingredient"}
      styles={{
        title: {
          fontWeight: 600,
        },
      }}
    >
      <EditIngredientFetchingPhase
        ingredientId={ingredientId}
        closeModal={() => updateModalRef.current?.close()}
      />
    </CustomMantineModal>
  );
};
