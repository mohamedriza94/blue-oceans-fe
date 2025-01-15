import { Grid, NumberInput, Textarea, TextInput } from "@mantine/core";
import { TBuilding } from "../table";
import { useEffect } from "react";
import { ActionButtons } from "../add-building/action-buttons";
import { useUpdateBuildingForm } from "../hooks/update-building/use-update-building-form";

type TProps = {
  building: TBuilding;
  closeModal: () => void;
};

export const EditBuilding = ({ building, closeModal }: TProps) => {
  const { form, handleSubmit, isPending, isSuccess } =
    useUpdateBuildingForm(building);

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid gutter="xs">
        <Grid.Col span={12}>
          <TextInput
            placeholder="Enter the building name"
            label="Building Name"
            withAsterisk
            disabled={isPending}
            key={form.key("buildingName")}
            {...form.getInputProps("buildingName")}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            placeholder="Enter the Address"
            label="Address"
            withAsterisk
            disabled={isPending}
            key={form.key("address")}
            {...form.getInputProps("address")}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            placeholder="Enter the Telephone No."
            label="Telephone"
            withAsterisk
            disabled={isPending}
            key={form.key("telephone")}
            {...form.getInputProps("telephone")}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <NumberInput
            placeholder="Price per extra parking slot"
            label="How much do you charge for each extra parking slot for an apartment? (USD)"
            withAsterisk
            disabled={isPending}
            min={0}
            clampBehavior="strict"
            key={form.key("chargePerExtraParkingSlotInUSD")}
            {...form.getInputProps("chargePerExtraParkingSlotInUSD")}
          />
        </Grid.Col>
        <Grid.Col span={12} mt={"xs"}>
          <ActionButtons
            isPending={isPending}
            resetFormFn={() => form.reset()}
          />
        </Grid.Col>
      </Grid>
    </form>
  );
};
