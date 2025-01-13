import { ActionIcon, Menu } from "@mantine/core";
import { RiEditLine, RiMore2Fill } from "@remixicon/react";
import { useRef } from "react";
import { TChiefOccupant } from "../chief-occupant-table";
import { EditChiefOccupantModal } from "../../edit-chief-occupant/edit-chief-occupant-modal";

type TProps = {
  occupant: TChiefOccupant;
};

export const TdActions = ({ occupant }: TProps) => {
  const updateModalRef = useRef<{ open: () => void; close: () => void }>(null);

  return (
    <>
      <Menu shadow="md" position="bottom-start" withArrow>
        <Menu.Target>
          <ActionIcon size={"md"} variant="subtle">
            <RiMore2Fill />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            onClick={() => updateModalRef.current?.open()}
            leftSection={<RiEditLine />}
          >
            Edit
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <EditChiefOccupantModal
        occupant={occupant}
        updateModalRef={updateModalRef}
      />
    </>
  );
};
