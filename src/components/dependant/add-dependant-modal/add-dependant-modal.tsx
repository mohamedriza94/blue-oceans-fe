import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { TChiefOccupant } from "../../chief-occupant/table";
import { RefObject } from "react";
import { AddDependantForm } from "./add-dependant-form";
import { ActionIcon, Tooltip } from "@mantine/core";
import { RiAddLine } from "@remixicon/react";

type TProps = {
  occupant: TChiefOccupant;
};

export const AddDependantModal = ({ occupant }: TProps) => {
  return (
    <CustomMantineModal
      title="Add a Dependant"
      size="md"
      centered
      styles={{
        title: {
          fontWeight: 600,
        },
      }}
      customTrigger={
        <Tooltip label="Add a dependant">
          <ActionIcon variant="transparent">
            <RiAddLine />
          </ActionIcon>
        </Tooltip>
      }
    >
      <AddDependantForm occupant={occupant} />
    </CustomMantineModal>
  );
};
