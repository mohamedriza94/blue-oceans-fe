import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { RefObject } from "react";
import { TChiefOccupant } from "../chief-occupant/table";
import { Flex, Stack, Text } from "@mantine/core";
import { AddDependantModal } from "./add-dependant-modal";
import { DependantTable } from "./table";

type TProps = {
  occupant: TChiefOccupant;
  dependantModalRef: RefObject<{ open: () => void; close: () => void }>;
};

export const DependantModal = ({ dependantModalRef, occupant }: TProps) => {
  return (
    <CustomMantineModal
      ref={dependantModalRef}
      withCloseButton={false}
      size="xl"
      centered
    >
      <Stack gap={"xs"} align="stretch">
        <Flex align={"center"} gap={"xs"} justify={"space-between"}>
          <Text fw={600}>Dependants</Text>
          <AddDependantModal occupant={occupant} />
        </Flex>

        <DependantTable occupantId={occupant._id} />
      </Stack>
    </CustomMantineModal>
  );
};
