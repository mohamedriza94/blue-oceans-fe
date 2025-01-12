import { TIngredient } from "@/components/ingredients/types/ingredient";
import {
  ActionIcon,
  Badge,
  Flex,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { RiCloseLine } from "@remixicon/react";

type NutritionalInfoItemProps = {
  isPending: boolean;
  nutritionalUnits: string[];
  handleRemoveNutrition: (index: number) => void;
  index: number;
  form: UseFormReturnType<TIngredient, (values: TIngredient) => TIngredient>;
};

export const NutritionalInfoItem = ({
  isPending,
  nutritionalUnits,
  handleRemoveNutrition,
  index,
  form,
}: NutritionalInfoItemProps) => {
  return (
    <Flex align="center" justify={"space-between"} gap={"xs"} key={index}>
      <Badge circle size="lg" variant="outline">
        {index + 1}
      </Badge>
      <TextInput
        size="xs"
        placeholder="Nutrition title"
        flex={1}
        disabled={isPending}
        key={form.key(`nutritionalInfo.${index}.nutrition`)}
        {...form.getInputProps(`nutritionalInfo.${index}.nutrition`)}
      />
      <Select
        size="xs"
        placeholder="Select Measuring Unit"
        data={
          nutritionalUnits?.map((unit) => ({
            value: unit,
            label: unit.charAt(0).toUpperCase() + unit.slice(1),
          })) ?? []
        }
        disabled={isPending}
        key={form.key(`nutritionalInfo.${index}.unit`)}
        {...form.getInputProps(`nutritionalInfo.${index}.unit`)}
      />
      <NumberInput
        size="xs"
        placeholder="Enter Unit Count"
        disabled={isPending}
        min={0}
        clampBehavior="strict"
        key={form.key(`nutritionalInfo.${index}.count`)}
        {...form.getInputProps(`nutritionalInfo.${index}.count`)}
      />
      <ActionIcon
        size="md"
        variant="light"
        disabled={isPending}
        onClick={() => handleRemoveNutrition(index)}
      >
        <RiCloseLine size={20} />
      </ActionIcon>
    </Flex>
  );
};
