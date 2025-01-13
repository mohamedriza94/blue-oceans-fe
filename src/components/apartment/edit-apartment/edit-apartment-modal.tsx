import { RefObject } from "react";
import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { TApartment } from "../table";
import { EditApartment } from "./edit-apartment";

type TProps = {
  apartment: TApartment;
  updateModalRef: RefObject<{ open: () => void; close: () => void }>;
};

export const EditApartmentModal = ({ apartment, updateModalRef }: TProps) => {
  return (
    <CustomMantineModal
      ref={updateModalRef}
      centered
      size={"md"}
      title={"Edit Apartment"}
      styles={{
        title: {
          fontWeight: 600,
        },
      }}
    >
      <EditApartment
        apartment={apartment}
        closeModal={() => updateModalRef.current?.close()}
      />
    </CustomMantineModal>
  );
};
