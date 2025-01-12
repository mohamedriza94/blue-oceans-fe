import { Loader, Text } from "@mantine/core";
import { Stack } from "@mantine/core";
import { EditIngredient } from "./edit-ingredient";
import { useGetOneIngredient } from "../hooks/use-get-one-ingredient-api";
import { TIngredient } from "../types/ingredient";

type EditIngredientFetchingPhaseProps = {
  ingredientId: TIngredient["_id"];
  closeModal: () => void;
};
export const EditIngredientFetchingPhase = ({
  closeModal,
  ingredientId,
}: EditIngredientFetchingPhaseProps) => {
  const { data, isPending: isLoadingIngredient } =
    useGetOneIngredient(ingredientId);

  return (
    <>
      {isLoadingIngredient ? (
        <Stack align="center" justify="center" p="xl">
          <Text>Getting Ingredient</Text>
          <Loader />
        </Stack>
      ) : !data ? (
        <Stack align="center" justify="center" p="xl">
          <Text c="amaranthRed.5" fw={500}>
            No Ingredient Found
          </Text>
        </Stack>
      ) : (
        <EditIngredient ingredient={data} closeModal={() => closeModal()} />
      )}
    </>
  );
};
