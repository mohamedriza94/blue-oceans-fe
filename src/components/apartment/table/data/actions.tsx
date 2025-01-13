import { ActionIcon, Menu } from "@mantine/core";
import { RiEditLine, RiMore2Fill } from "@remixicon/react";
import { useRef } from "react";
import { TApartment } from "../apartment-table";

type TProps = {
  apartment: TApartment;
};

export const TdActions = ({ apartment }: TProps) => {
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
    </>
  );
};
