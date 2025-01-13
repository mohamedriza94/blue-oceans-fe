import { ActionIcon, Group } from "@mantine/core";
import { DependantModal } from "@/components/dependant/dependant-modal";
import { TDependant } from "../dependant-table";
import { useRef } from "react";
import { RiDeleteBinLine, RiEditLine } from "@remixicon/react";
import { EditDependantModal } from "../../edit-dependant-modal";

type TProps = {
  dependant: TDependant;
};

export const TdActions = ({ dependant }: TProps) => {
  const updateModalRef = useRef<{ open: () => void; close: () => void }>(null);
  const deleteModalRef = useRef<{ open: () => void; close: () => void }>(null);

  return (
    <>
      <Group align="center" justify="center" gap={"xs"}>
        <ActionIcon
          variant="transparent"
          onClick={() => updateModalRef.current?.open()}
        >
          <RiEditLine />
        </ActionIcon>
        <ActionIcon
          color="amaranthRed.5"
          variant="transparent"
          onClick={() => deleteModalRef.current?.open()}
        >
          <RiDeleteBinLine />
        </ActionIcon>
      </Group>

      <EditDependantModal
        dependant={dependant}
        updateModalRef={updateModalRef}
      />
    </>
  );
};
