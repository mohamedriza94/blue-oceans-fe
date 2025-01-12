import { RefObject } from "react";
import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { EditBuilding } from "./edit-building";
import { TBuilding } from "../table";

type TProps = {
  building: TBuilding;
  updateModalRef: RefObject<{ open: () => void; close: () => void }>;
};

export const EditBuildingModal = ({ building, updateModalRef }: TProps) => {
  return (
    <CustomMantineModal
      ref={updateModalRef}
      centered
      size={"sm"}
      title={"Edit Building"}
      styles={{
        title: {
          fontWeight: 600,
        },
      }}
    >
      <EditBuilding
        building={building}
        closeModal={() => updateModalRef.current?.close()}
      />
    </CustomMantineModal>
  );
};
