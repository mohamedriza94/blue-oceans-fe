import { ScrollAreaAutosize, Stack } from "@mantine/core";
import { EditMenuForm } from "./edit-menu-form";
import { TMenuItem } from "../../types/menu-item";
import { RefObject } from "react";
import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";

type EditMenuProps = {
  menu: TMenuItem;
  editModalRef: RefObject<{ open: () => void; close: () => void }>;
};

export const EditMenu = ({ menu, editModalRef }: EditMenuProps) => {
  const handeCloseModal = () => {
    editModalRef.current?.close();
  };

  return (
    <CustomMantineModal ref={editModalRef} centered size={"100%"}>
      <EditMenuForm menu={menu} closeModal={handeCloseModal} />
    </CustomMantineModal>
  );
};
