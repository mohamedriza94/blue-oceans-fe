import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { RefObject } from "react";
import { EditDependantForm } from "./edit-dependant-form";
import { TDependant } from "../table";

type TProps = {
  dependant: TDependant;
  updateModalRef: RefObject<{ open: () => void; close: () => void }>;
};

export const EditDependantModal = ({ dependant, updateModalRef }: TProps) => {
  return (
    <CustomMantineModal
      ref={updateModalRef}
      title="Edit a Dependant"
      size="md"
      centered
      styles={{
        title: {
          fontWeight: 600,
        },
      }}
    >
      <EditDependantForm
        dependant={dependant}
        closeModal={() => updateModalRef.current?.close()}
      />
    </CustomMantineModal>
  );
};
