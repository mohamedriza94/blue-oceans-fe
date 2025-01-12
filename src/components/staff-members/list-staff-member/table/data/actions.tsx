import { ActionIcon, Menu } from "@mantine/core";
import { TStaffMember } from "../../../types/staff-member";
import {
  RiDeleteBinLine,
  RiEditCircleLine,
  RiEditLine,
  RiMore2Fill,
  RiResetLeftLine,
} from "@remixicon/react";
import { DeleteStaffMember } from "../../../delete-staff-member";
import { useRef } from "react";
import { RestoreStaffMember } from "../../../restore-staff-member";
import { EditStaffMemberModal } from "../../../edit-staff-member";

type TdActionsProps = {
  member: TStaffMember;
};

export const TdActions = ({ member }: TdActionsProps) => {
  const isDeleted = member.deletion?.isDeleted;

  const deleteModalRef = useRef<{ open: () => void; close: () => void }>(null);
  const restoreModalRef = useRef<{ open: () => void; close: () => void }>(null);
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
            <Menu.Item
              onClick={() => updateModalRef.current?.open()}
              leftSection={<RiEditLine />}
            >
              Edit
            </Menu.Item>
          )}
        </Menu.Dropdown>
      </Menu>

      <DeleteStaffMember member={member} deleteModalRef={deleteModalRef} />
      <RestoreStaffMember member={member} restoreModalRef={restoreModalRef} />
      <EditStaffMemberModal member={member} updateModalRef={updateModalRef} />
    </>
  );
};
