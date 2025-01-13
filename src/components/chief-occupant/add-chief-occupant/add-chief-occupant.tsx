import {
  Grid,
  MultiSelect,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { UploadAvatar } from "./inputs/upload-avatar";
import { ActionButtons } from "./inputs/action-buttons";
import { useEffect, useState } from "react";
import {
  chiefOccupantStatus,
  useAddChiefOccupantForm,
} from "../hooks/add-chief-occupant/use-add-chief-occupant-form";
import { useGetApartments } from "@/components/apartment/hooks/use-read-apartments-api";
import { TOption } from "@/components/apartment/add-apartment";
import { TApartment } from "@/components/apartment/table";

type TProps = {
  closeModal: () => void;
};

export const AddChiefOccupant = ({ closeModal }: TProps) => {
  const { data: apartmentData } = useGetApartments(200);
  const { form, handleSubmit, isPending, uploading, file, setFile, isSuccess } =
    useAddChiefOccupantForm();

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess]);

  // Get apartment and set the options for the Select component
  const [apartmentList, setApartmentList] = useState<TOption[]>([]);

  useEffect(() => {
    if (apartmentData?.data.data.apartments) {
      const list: TOption[] = apartmentData.data.data.apartments.map(
        (apartment: TApartment) => ({
          label: apartment.identification,
          value: apartment._id,
        }),
      );
      setApartmentList(list);
    }
  }, [apartmentData]);

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
          <Select
            data={apartmentList}
            placeholder="Select apartment"
            label="Apartment"
            withAsterisk
            disabled={isPending}
            key={form.key("apartmentId")}
            {...form.getInputProps("apartmentId")}
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

        <Grid.Col span={12}>
          <Select
            placeholder="Select the Status"
            label="Status"
            withAsterisk
            data={chiefOccupantStatus}
            disabled={isPending}
            key={form.key("status")}
            {...form.getInputProps("status")}
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
