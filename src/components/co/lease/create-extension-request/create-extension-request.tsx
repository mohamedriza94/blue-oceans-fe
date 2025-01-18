import { ActionButtons } from "@/components/apartment/add-apartment/action-buttons";
import { TLeaseAgreementData } from "@/components/lease/hooks/create-lease/lease-agreement";
import { Group, Stack, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useCreateExtensionRequestForm } from "./hooks/use-create-extension-request-form";

export const CreateExtensionRequest = ({
  leaseData,
}: {
  leaseData: TLeaseAgreementData;
}) => {
  const { form, isPending, leaseEndDate, leaseEndPlusOneMonth, handleSubmit } =
    useCreateExtensionRequestForm(leaseData);

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack align="stretch" gap="xs">
          <DateInput
            label="Extend Upto"
            withAsterisk
            min={leaseEndDate.toISOString().split("T")[0]} // Restricts manually entered dates
            minDate={leaseEndPlusOneMonth} // Restricts selectable dates to start from lease end date
            key={form.key("requestedEndDate")}
            {...form.getInputProps("requestedEndDate")}
          />

          <Textarea
            label="Reason for extension"
            withAsterisk
            key={form.key("reason")}
            {...form.getInputProps("reason")}
          />

          <ActionButtons
            isPending={isPending}
            resetFormFn={() => form.reset()}
          />
        </Stack>
      </form>
    </>
  );
};
