import { useEffect, useState } from "react";
import {
  apartmentClasses,
  apartmentStatuses,
  useAddBuildingForm,
} from "../hooks/add-apartment/use-add-apartment-form";
import { Fieldset, Grid, Select, Textarea, TextInput } from "@mantine/core";
import { ActionButtons } from "./action-buttons";
import { fieldsetStyles } from "@/components/common/form-fieldset-style";
import { CustomDropzone } from "@/shared/components/custom-dropzone";
import { useGetBuildings } from "@/components/building/hooks/use-read-buildings-api";
import { TBuilding } from "../table";

type TProps = {
  closeModal: () => void;
};

type TOption = {
  label: string;
  value: string;
};

export const AddApartment = ({ closeModal }: TProps) => {
  const { data: buildingData } = useGetBuildings(100);

  const {
    form,
    handleSubmit,
    isPending,
    isSuccess,
    files,
    setFiles,
    resetForm,
  } = useAddBuildingForm();

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess]);

  // Get buildings and set the options for the Select component
  const [buildingsList, setBuildingsList] = useState<TOption[]>([]);

  useEffect(() => {
    if (buildingData?.data.data.buildings) {
      const list: TOption[] = buildingData.data.data.buildings.map(
        (building: TBuilding) => ({
          label: building.buildingName,
          value: building._id,
        }),
      );
      setBuildingsList(list);
    }
  }, [buildingData]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid gutter="xs">
        <Grid.Col span={12}>
          <Select
            data={buildingsList}
            placeholder="Select building"
            label="Building"
            withAsterisk
            disabled={isPending}
            key={form.key("buildingId")}
            {...form.getInputProps("buildingId")}
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
              files={files}
              setFiles={setFiles}
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
            withAsterisk
            disabled={isPending}
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
