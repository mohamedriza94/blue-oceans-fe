import { RefObject } from "react";
import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { TBuilding } from "../table";
import { SeeParkingSlots } from "./see-parking-slots";

type TProps = {
  building: TBuilding;
  seeParkingSlotsModalRef: RefObject<{ open: () => void; close: () => void }>;
};

export const SeeParkingSlotsModal = ({
  building,
  seeParkingSlotsModalRef,
}: TProps) => {
  return (
    <CustomMantineModal
      ref={seeParkingSlotsModalRef}
      centered
      size={"lg"}
      title={`Parking Slots of ${building.buildingName}`}
      styles={{
        title: {
          fontWeight: 600,
        },
      }}
    >
      <SeeParkingSlots buildingId={building._id} />
    </CustomMantineModal>
  );
};
