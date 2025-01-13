import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { ActionIcon, Tooltip } from "@mantine/core";
import { RiAddLine } from "@remixicon/react";
import { useRef } from "react";
import { AddChiefOccupant } from "./add-chief-occupant";

export const AddChiefOccupantModal = () => {
  const addModalRef = useRef<{ open: () => void; close: () => void }>(null);

  return (
    <CustomMantineModal
      ref={addModalRef}
      centered
      size={"sm"}
      title={"Add Chief Occupant"}
      styles={{
        title: {
          fontWeight: 600,
        },
      }}
      customTrigger={
        <Tooltip label={"Add a Chief Occupant"}>
          <ActionIcon variant="transparent">
            <RiAddLine />
          </ActionIcon>
        </Tooltip>
      }
    >
      <AddChiefOccupant closeModal={() => addModalRef.current?.close()} />
    </CustomMantineModal>
  );
};
