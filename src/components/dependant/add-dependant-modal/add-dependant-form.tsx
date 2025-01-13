import { TChiefOccupant } from "@/components/chief-occupant/table";
import { useAddDependantForm } from "../hooks/add-dependant/use-add-dependant-form";
import { Grid, Stack, Text, TextInput } from "@mantine/core";
import { UploadAvatar } from "@/components/chief-occupant/add-chief-occupant/inputs/upload-avatar";
import { DateInput } from "@mantine/dates";
import { ActionButtons } from "@/components/apartment/add-apartment/action-buttons";

type TProps = {
  occupant: TChiefOccupant;
};

export const AddDependantForm = ({ occupant }: TProps) => {
  const { form, handleSubmit, isPending, uploading, file, setFile } =
    useAddDependantForm(occupant);

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
            placeholder="Enter the full name"
            label="Full Name"
            withAsterisk
            disabled={isPending}
            key={form.key("fullName")}
            {...form.getInputProps("fullName")}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <TextInput
            placeholder="Enter the contact number"
            label="Contact Number"
            disabled={isPending}
            key={form.key("contactNumber")}
            {...form.getInputProps("contactNumber")}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <TextInput
            placeholder="Enter the Email"
            label="Email"
            disabled={isPending}
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <TextInput
            placeholder="Ex: sister, daughter, son, father etc..."
            label="Relationship"
            withAsterisk
            disabled={isPending}
            key={form.key("relationship")}
            {...form.getInputProps("relationship")}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <DateInput
            maxDate={new Date()}
            label="Date of Birth"
            withAsterisk
            disabled={isPending}
            key={form.key("dateOfBirth")}
            {...form.getInputProps("dateOfBirth")}
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
