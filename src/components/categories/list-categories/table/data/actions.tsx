import { EditCategoryModal } from "@/components/categories/edit/edit-modal";
import { AddChildrenModal } from "@/components/categories/modals/add-children";
import { DeleteCategory } from "@/components/categories/modals/delete-category";
import { RestoreCategory } from "@/components/categories/modals/restore-category";
import { TCategory } from "@/components/categories/types/category";
import { ActionIcon, Menu } from "@mantine/core";
import {
  RiAddLine,
  RiDeleteBinLine,
  RiEditLine,
  RiMore2Fill,
  RiResetLeftLine,
} from "@remixicon/react";
import { useRef } from "react";

type TdActionsProps = {
  category: TCategory;
};

export const TdActions = ({ category }: TdActionsProps) => {
  const isDeleted = category.deletion?.isDeleted;

  const updateModalRef = useRef<{ open: () => void; close: () => void }>(null);
  const deleteModalRef = useRef<{ open: () => void; close: () => void }>(null);
  const restoreModalRef = useRef<{ open: () => void; close: () => void }>(null);
  const addChildrenModalRef = useRef<{ open: () => void; close: () => void }>(
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
          {!isDeleted && (
            <>
              <Menu.Item
                leftSection={<RiAddLine />}
                onClick={() => addChildrenModalRef.current?.open()}
                color="green.5"
              >
                Add Children
              </Menu.Item>

              <Menu.Item
                leftSection={<RiEditLine />}
                onClick={() => updateModalRef.current?.open()}
              >
                Edit
              </Menu.Item>
            </>
          )}

          {isDeleted ? (
            <Menu.Item
              leftSection={<RiResetLeftLine />}
              onClick={() => restoreModalRef.current?.open()}
            >
              Restore
            </Menu.Item>
          ) : (
            <Menu.Item
              leftSection={<RiDeleteBinLine />}
              onClick={() => deleteModalRef.current?.open()}
            >
              Delete
            </Menu.Item>
          )}
        </Menu.Dropdown>
      </Menu>

      <AddChildrenModal
        addChildrenModalRef={addChildrenModalRef}
        categoryId={category._id}
      />
      <EditCategoryModal
        categoryId={category._id}
        updateModalRef={updateModalRef}
      />
      <DeleteCategory deleteModalRef={deleteModalRef} category={category} />
      <RestoreCategory restoreModalRef={restoreModalRef} category={category} />
    </>
  );
};
