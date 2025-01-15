import { Fieldset, Grid, InputLabel, NumberInput, Select } from "@mantine/core";
import { useCreateLeaseForm } from "../hooks/create-lease/use-create-lease-form";
import { useState } from "react";
import { TChiefOccupant } from "@/components/chief-occupant/table";
import { ChiefOccupantAndApartment } from "./inputs/chief-occupant-n-apartment";
import { CustomRichTextEditor } from "@/shared/components/custom-rich-text-editor";
import { CustomDropzone } from "@/shared/components/custom-dropzone";
import { fieldsetStyles } from "@/components/common/form-fieldset-style";
import { ENUMPaymentSchedule } from "../hooks/create-lease/use-create-lease-api";
import { DateInput } from "@mantine/dates";
import { ActionButtons } from "./inputs/action-buttons";

export const CreateLease = () => {
  const { data, isPending, setFiles, files, form, handleSubmit, resetForm } =
    useCreateLeaseForm();

  const [selectedOccupant, setSelectedOccupant] =
    useState<TChiefOccupant | null>(null);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid gutter="xs">
        <Grid.Col span={12}>
          <ChiefOccupantAndApartment
            form={form}
            isPending={isPending}
            selectedOccupant={selectedOccupant}
            setSelectedOccupant={setSelectedOccupant}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <InputLabel>Terms and Conditions</InputLabel>
          <CustomRichTextEditor
            placeholder="Enter the terms and conditions"
            value={form.values.termsAndConditions}
            onChange={(value) =>
              form.setFieldValue("termsAndConditions", value)
            }
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <Fieldset legend="Images" styles={fieldsetStyles} variant="filled">
            <CustomDropzone
              allowedTypes={["pdf", "word", "image"]}
              files={files}
              setFiles={setFiles}
              isUploading={isPending}
            />
          </Fieldset>
        </Grid.Col>

        {/* <Grid.Col span={4}>
          <Select
            data={Object.values(ENUMPaymentSchedule)}
            placeholder="Select Payment Schedule"
            label="Rent Payment Schedule"
            withAsterisk
            disabled={isPending}
            key={form.key("paymentSchedule")}
            {...form.getInputProps("paymentSchedule")}
          />
        </Grid.Col> */}

        <Grid.Col span={4}>
          <NumberInput
            placeholder="How many additional parking slots do you need?"
            label="Additional Parking Slots"
            withAsterisk
            disabled={isPending}
            min={0}
            clampBehavior="strict"
            key={form.key("additionalParkingSlots")}
            {...form.getInputProps("additionalParkingSlots")}
          />
        </Grid.Col>

        <Grid.Col span={4}>
          <NumberInput
            placeholder="Enter Rent Amount (USD)"
            label="Rent Amount (USD)"
            withAsterisk
            disabled={isPending}
            min={0}
            clampBehavior="strict"
            key={form.key("rentAmountInUSD")}
            {...form.getInputProps("rentAmountInUSD")}
          />
        </Grid.Col>

        <Grid.Col span={4}>
          <NumberInput
            placeholder="Enter Security Deposit (USD)"
            label="Security Deposit (USD)"
            withAsterisk
            disabled={isPending}
            min={0}
            clampBehavior="strict"
            key={form.key("securityDepositInUSD")}
            {...form.getInputProps("securityDepositInUSD")}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <DateInput
            maxDate={new Date()}
            label="Start Date"
            withAsterisk
            disabled={isPending}
            key={form.key("startDate")}
            {...form.getInputProps("startDate")}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <DateInput
            maxDate={new Date()}
            minDate={
              form.values.startDate
                ? new Date(new Date(form.values.startDate).getTime() + 86400000)
                : new Date()
            }
            label="End Date"
            withAsterisk
            disabled={isPending}
            key={form.key("endDate")}
            {...form.getInputProps("endDate")}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <ActionButtons isPending={isPending} resetFormFn={resetForm} />
        </Grid.Col>
      </Grid>
    </form>
  );
};
