import { Grid, Stack, Text, TextInput } from "@mantine/core";
import { UploadAvatar } from "./inputs/upload-avatar";
import { ActionButtons } from "./inputs/action-buttons";
import { useEffect } from "react";
import { useAddChiefOccupantForm } from "../hooks/add-chief-occupant/use-add-chief-occupant-form";
import { TChiefOccupant } from "../table";
import { useEditChiefOccupantForm } from "../hooks/edit-chief-occupant/use-edit-chief-occupant-form";

type TProps = {
  occupant: TChiefOccupant;
  closeModal: () => void;
};

export const EditChiefOccupant = ({ occupant, closeModal }: TProps) => {
  const { form, handleSubmit, isPending, uploading, file, setFile, isSuccess } =
    useEditChiefOccupantForm(occupant);

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid gutter="xs">
        <Grid.Col span={12}>
          <Stack align="center" gap={"xs"}>
            <UploadAvatar
              file={file}
              setFile={setFile}
              uploading={uploading}
              isSubmitting={isPending}
            />

            <Text c={"amaranthRed.5"} fz={"xs"}>
              {form.errors.image}
            </Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={12}>
          <TextInput
            value={occupant.apartmentId.identification}
            label="Apartment"
            withAsterisk
            disabled
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <TextInput
            placeholder="Enter the full name"
            label="Full Name"
            withAsterisk
            disabled={isPending}
            key={form.key("fullName")}
            {...form.getInputProps("fullName")}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <TextInput
            placeholder="Enter the contact number"
            label="Contact Number"
            withAsterisk
            disabled={isPending}
            key={form.key("contactNumber")}
            {...form.getInputProps("contactNumber")}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <TextInput
            placeholder="Enter the Email"
            label="Email"
            withAsterisk
            disabled={isPending}
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
        </Grid.Col>

        <Grid.Col span={12} mt={"xs"}>
          <ActionButtons
            isPending={isPending || uploading}
            resetFormFn={() => form.reset()}
          />
        </Grid.Col>
      </Grid>
    </form>
  );
};
