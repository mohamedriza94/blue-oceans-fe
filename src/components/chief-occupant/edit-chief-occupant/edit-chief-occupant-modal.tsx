import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { EditChiefOccupant } from "./edit-chief-occupant";
import { TChiefOccupant } from "../table";
import { RefObject } from "react";

type TProps = {
  occupant: TChiefOccupant;
  updateModalRef: RefObject<{ open: () => void; close: () => void }>;
};

export const EditChiefOccupantModal = ({
  occupant,
  updateModalRef,
}: TProps) => {
  return (
    <CustomMantineModal
      ref={updateModalRef}
      centered
      size={"sm"}
      title={"Edit Chief Occupant"}
      styles={{
        title: {
          fontWeight: 600,
        },
      }}
    >
      <EditChiefOccupant
        occupant={occupant}
        closeModal={() => updateModalRef.current?.close()}
      />
    </CustomMantineModal>
  );
};
