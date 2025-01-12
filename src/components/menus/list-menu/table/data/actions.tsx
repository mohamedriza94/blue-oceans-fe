import { EditMenu } from "@/components/menus/create-or-edit-menu/edit-menu";
import { DeleteMenu } from "@/components/menus/delete-menu";
import { ManageAccess } from "@/components/menus/manage-access";
import { RestoreMenu } from "@/components/menus/restore-menu";
import { TMenuItem } from "@/components/menus/types/menu-item";
import { ActionIcon, Menu } from "@mantine/core";
import {
  RiDeleteBinLine,
  RiEditLine,
  RiMore2Fill,
  RiResetLeftLine,
  RiSwap2Line,
} from "@remixicon/react";
import { useRef } from "react";

type TdActionsProps = {
  menuItem: TMenuItem;
};

export const TdActions = ({ menuItem }: TdActionsProps) => {
  const isDeleted = menuItem.deletion?.isDeleted;

  const deleteModalRef = useRef<{ open: () => void; close: () => void }>(null);
  const restoreModalRef = useRef<{ open: () => void; close: () => void }>(null);
  const editModalRef = useRef<{ open: () => void; close: () => void }>(null);
  const manageAccessModalRef = useRef<{ open: () => void; close: () => void }>(
    null,
  );

  return (
    <>
      <Menu shadow="md" position="bottom-start" withArrow>
        <Menu.Target>
          <ActionIcon size={"md"} variant="subtle">
            <RiMore2Fill />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          {isDeleted ? (
            <Menu.Item
              onClick={() => restoreModalRef.current?.open()}
              leftSection={<RiResetLeftLine />}
            >
              Restore
            </Menu.Item>
          ) : (
            <Menu.Item
              onClick={() => deleteModalRef.current?.open()}
              leftSection={<RiDeleteBinLine />}
            >
              Delete
            </Menu.Item>
          )}

          {!isDeleted && (
            <>
              <Menu.Item
                onClick={() => manageAccessModalRef.current?.open()}
                leftSection={<RiSwap2Line />}
              >
                Manage Access
              </Menu.Item>
              <Menu.Item
                onClick={() => editModalRef.current?.open()}
                leftSection={<RiEditLine />}
              >
                Edit
              </Menu.Item>
            </>
          )}
        </Menu.Dropdown>
      </Menu>

      <DeleteMenu menuItem={menuItem} deleteModalRef={deleteModalRef} />
      <RestoreMenu menuItem={menuItem} restoreModalRef={restoreModalRef} />
      <ManageAccess
        menuItem={menuItem}
        manageAccessModalRef={manageAccessModalRef}
      />
      <EditMenu editModalRef={editModalRef} menu={menuItem} />
    </>
  );
};
