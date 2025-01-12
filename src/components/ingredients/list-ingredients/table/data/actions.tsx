import { DeleteIngredient } from "@/components/ingredients/delete-ingredient";
import { EditIngredientModal } from "@/components/ingredients/edit-ingredient";
import { RestoreIngredient } from "@/components/ingredients/restore-ingredient";
import { TIngredient } from "@/components/ingredients/types/ingredient";
import { ActionIcon, Menu } from "@mantine/core";
import {
  RiDeleteBinLine,
  RiEditLine,
  RiMore2Fill,
  RiResetLeftLine,
} from "@remixicon/react";
import { useRef } from "react";

type TdActionsProps = {
  ingredient: TIngredient;
};

export const TdActions = ({ ingredient }: TdActionsProps) => {
  const isDeleted = ingredient.deletion?.isDeleted;

  const updateModalRef = useRef<{ open: () => void; close: () => void }>(null);
  const deleteModalRef = useRef<{ open: () => void; close: () => void }>(null);
  const restoreModalRef = useRef<{ open: () => void; close: () => void }>(null);

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

          {!isDeleted && (
            <>
              <Menu.Item
                leftSection={<RiEditLine />}
                onClick={() => updateModalRef.current?.open()}
              >
                Edit
              </Menu.Item>
            </>
          )}
        </Menu.Dropdown>
      </Menu>

      <EditIngredientModal
        ingredientId={ingredient._id}
        updateModalRef={updateModalRef}
      />

      <DeleteIngredient
        ingredient={ingredient}
        deleteModalRef={deleteModalRef}
      />

      <RestoreIngredient
        ingredient={ingredient}
        restoreModalRef={restoreModalRef}
      />
    </>
  );
};
