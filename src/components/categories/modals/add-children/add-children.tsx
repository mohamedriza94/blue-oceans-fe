import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { RefObject, useState } from "react";
import { ChildrenCountForm } from "./children-count-form";
import { TCategory } from "../../types/category";

type AddChildrenModalProps = {
  addChildrenModalRef: RefObject<{ open: () => void; close: () => void }>;
  categoryId: TCategory["_id"];
};

export const AddChildrenModal = ({
  addChildrenModalRef,
  categoryId,
}: AddChildrenModalProps) => {
  const [isChildrenSet, setIsChildrenSet] = useState<boolean>(false);

  return (
    <CustomMantineModal
      ref={addChildrenModalRef}
      centered
      size={isChildrenSet ? "100%" : "sm"}
      title="Add Children"
      onClose={() => {
        addChildrenModalRef.current?.close();
        setIsChildrenSet(false);
      }}
    >
      <ChildrenCountForm
        setIsChildrenSet={setIsChildrenSet}
        isChildrenSet={isChildrenSet}
        categoryId={categoryId}
      />
    </CustomMantineModal>
  );
};
