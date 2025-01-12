import { TIngredient } from "@/components/ingredients/types/ingredient";
import { Button, Flex, ScrollAreaAutosize, Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { RiAddLine } from "@remixicon/react";
import { NutritionalInfoItem } from "./nutrional-info-item";
import { useGetIngredientAttributes } from "@/components/ingredients/hooks/get-ingredient-attributes";

type NutritionalInfoProps = {
  form: UseFormReturnType<TIngredient, (values: TIngredient) => TIngredient>;
  isPending: boolean;
};

export const NutritionalInfo = ({ form, isPending }: NutritionalInfoProps) => {
  const { data, isPending: isLoadingAttributes } = useGetIngredientAttributes();

  const handleAddNutrition = () => {
    form.insertListItem("nutritionalInfo", {
      nutrition: "",
      count: "",
      unit: "",
    });
  };

  const handleRemoveNutrition = (index: number) => {
    form.removeListItem("nutritionalInfo", index);
  };

  const nutritionalInfo = form.values.nutritionalInfo;

  return (
    <Stack gap={"md"}>
      {nutritionalInfo && nutritionalInfo.length ? (
        <ScrollAreaAutosize mah={200} offsetScrollbars type="auto">
          <Stack gap={8}>
            {nutritionalInfo.map((_, index) => (
              <NutritionalInfoItem
                handleRemoveNutrition={handleRemoveNutrition}
                nutritionalUnits={data?.nutritionalUnits ?? []}
                isPending={isLoadingAttributes || isPending}
                index={index}
                form={form}
              />
            ))}
          </Stack>
        </ScrollAreaAutosize>
      ) : (
        <></>
      )}
      <Flex justify={nutritionalInfo?.length ? "flex-end" : "flex-start"}>
        <Button
          variant="outline"
          size="compact-md"
          leftSection={<RiAddLine size={20} />}
          onClick={handleAddNutrition}
          disabled={isPending}
        >
          Add Nutrition
        </Button>
      </Flex>
    </Stack>
  );
};
