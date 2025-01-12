import {
  Grid,
  MultiSelect,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useGetStaffMemberAttributes } from "../hooks/use-get-staff-member-attributes";
import { useEffect } from "react";
import { TStaffMember } from "../types/staff-member";
import { ActionButtons } from "../add-staff-member/inputs/action-buttons";
import { useEditStaffMemberForm } from "../hooks/edit-staff-member/use-edit-staff-member-form";
import { UploadAvatar } from "../add-staff-member/inputs/upload-avatar";

type EditStaffMemberProps = {
  member: TStaffMember;
  closeModal: () => void;
};

export const EditStaffMember = ({
  member,
  closeModal,
}: EditStaffMemberProps) => {
  const { data: attributes } = useGetStaffMemberAttributes();
  const { form, handleSubmit, isPending, uploading, file, setFile, isSuccess } =
    useEditStaffMemberForm(member);

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
              {form.errors.avatar}
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
            data={
              attributes?.statuses.map((status) => ({
                value: status,
                label: status.charAt(0).toUpperCase() + status.slice(1),
              })) ?? []
            }
            disabled={isPending}
            key={form.key("status")}
            {...form.getInputProps("status")}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <MultiSelect
            placeholder="Select the Roles"
            label="Roles"
            withAsterisk
            data={
              attributes?.roles.map((role) => ({
                value: role,
                label: role.charAt(0).toUpperCase() + role.slice(1),
              })) ?? []
            }
            disabled={isPending}
            key={form.key("roles")}
            {...form.getInputProps("roles")}
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
