import { ActionIcon, Menu } from "@mantine/core";
import { RiEditLine, RiEye2Line, RiMore2Fill } from "@remixicon/react";
import { useRef } from "react";
import { TBuilding } from "../building-table";
import { EditBuildingModal } from "../../edit-building";
import { SeeParkingSlotsModal } from "../../see-parking-slots";

type TProps = {
  building: TBuilding;
};

export const TdActions = ({ building }: TProps) => {
  const seeParkingSlotsModalRef = useRef<{
    open: () => void;
    close: () => void;
  }>(null);
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
          <Menu.Item
            onClick={() => seeParkingSlotsModalRef.current?.open()}
            leftSection={<RiEye2Line />}
          >
            See Parking Slots
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <EditBuildingModal building={building} updateModalRef={updateModalRef} />
      <SeeParkingSlotsModal
        building={building}
        seeParkingSlotsModalRef={seeParkingSlotsModalRef}
      />
    </>
  );
};
