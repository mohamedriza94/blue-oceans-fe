import { RefObject } from "react";
import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { TCategory } from "../types/category";
import { EditCategoryFetchingPhase } from "./edit-fetching-phase";

type EditCategoryModalProps = {
  categoryId: TCategory["_id"];
  updateModalRef: RefObject<{ open: () => void; close: () => void }>;
};

export const EditCategoryModal = ({
  categoryId,
  updateModalRef,
}: EditCategoryModalProps) => {
  return (
    <CustomMantineModal
      ref={updateModalRef}
      centered
      size={"100%"}
      title={"Edit Category"}
      styles={{
        title: {
          fontWeight: 600,
        },
      }}
    >
      <EditCategoryFetchingPhase
        categoryId={categoryId}
        closeModal={() => updateModalRef.current?.close()}
      />
    </CustomMantineModal>
  );
};
