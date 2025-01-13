import { useEffect } from "react";
import {
  apartmentClasses,
  apartmentStatuses,
} from "../hooks/add-apartment/use-add-apartment-form";
import { Fieldset, Grid, Select, Textarea, TextInput } from "@mantine/core";
import { fieldsetStyles } from "@/components/common/form-fieldset-style";
import { CustomDropzone } from "@/shared/components/custom-dropzone";
import { TApartment } from "../table";
import { ActionButtons } from "../add-apartment/action-buttons";
import { useEditApartmentForm } from "../hooks/edit-apartment/use-edit-apartment-form";

type TProps = {
  apartment: TApartment;
  closeModal: () => void;
};

export const EditApartment = ({ apartment, closeModal }: TProps) => {
  const {
    form,
    handleSubmit,
    isPending,
    isSuccess,
    allFiles,
    setAllFiles,
    resetForm,
  } = useEditApartmentForm(apartment);

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
            label="Building"
            value={apartment.buildingId.buildingName}
            disabled
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            placeholder="Enter the description"
            label="Description"
            withAsterisk
            disabled={isPending}
            key={form.key("description")}
            {...form.getInputProps("description")}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <Fieldset legend="Images" styles={fieldsetStyles} variant="filled">
            <CustomDropzone
              files={allFiles}
              setFiles={setAllFiles}
              isUploading={isPending}
            />
          </Fieldset>
        </Grid.Col>

        <Grid.Col span={6}>
          <TextInput
            placeholder="Enter the Telephone No."
            label="Telephone"
            withAsterisk
            disabled={isPending}
            key={form.key("telephone")}
            {...form.getInputProps("telephone")}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <TextInput
            placeholder="Enter the Apartment Number"
            label="Identification"
            withAsterisk
            disabled={isPending}
            key={form.key("identification")}
            {...form.getInputProps("identification")}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Select
            data={apartmentClasses}
            placeholder="Select apartment class"
            label="Class"
            withAsterisk
            disabled={isPending}
            key={form.key("class")}
            {...form.getInputProps("class")}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Select
            data={apartmentStatuses}
            placeholder="Select apartment status"
            label="Status"
            disabled={form.values.status === "Occupied" || isPending}
            key={form.key("status")}
            {...form.getInputProps("status")}
          />
        </Grid.Col>

        <Grid.Col span={12} mt={"xs"}>
          <ActionButtons
            isPending={isPending}
            resetFormFn={() => resetForm()}
          />
        </Grid.Col>
      </Grid>
    </form>
  );
};
