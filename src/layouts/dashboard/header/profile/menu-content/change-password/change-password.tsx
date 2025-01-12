import { Button, PasswordInput, Stack, Text, ThemeIcon } from "@mantine/core";
import { useChangePasswordForm } from "./hooks/use-change-password-form";
import { RiCheckboxCircleLine } from "@remixicon/react";

export const ChangePassword = () => {
  const { form, handleSubmit, isPending, isSuccess } = useChangePasswordForm();

  return (
    <Stack align="stretch" justify="flex-start" gap="sm">
      <Text c="darkBrown.6" fw={700} fz="h2" ta="center">
        Change Password
      </Text>

      {isSuccess ? (
        <Stack align="center" gap={"lg"} justify="center" mt={"xl"}>
          <ThemeIcon radius={100} size={60} bg={"green.4"}>
            <RiCheckboxCircleLine size={"100%"} />
          </ThemeIcon>

          <Stack align="center" gap={"xs"}>
            <Text c={"darkBrown.6"} fz={"xl"} fw={700}>
              Successful
            </Text>
            <Text c={"darkBrown.6"} fw={400}>
              Your password has been changed
            </Text>
          </Stack>
        </Stack>
      ) : (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="sm" align="stretch">
            <PasswordInput
              key={form.key("currentPassword")}
              {...form.getInputProps("currentPassword")}
              label="Current Password"
              placeholder="Enter the current password"
              disabled={isPending}
            />
            <PasswordInput
              key={form.key("newPassword")}
              {...form.getInputProps("newPassword")}
              label="New Password"
              placeholder="Enter the new password"
              disabled={isPending}
            />
            <PasswordInput
              key={form.key("confirmedNewPassword")}
              {...form.getInputProps("confirmedNewPassword")}
              label="Confirm New Password"
              placeholder="Re-enter the new password"
              disabled={isPending}
            />

            <Button
              loading={isPending}
              disabled={isPending}
              variant="filled"
              type={"submit"}
            >
              Update
            </Button>
          </Stack>
        </form>
      )}
    </Stack>
  );
};
